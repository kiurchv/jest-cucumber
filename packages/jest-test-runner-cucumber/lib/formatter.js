const { formatResultsErrors } = require("jest-message-util");
const { Status } = require("cucumber");

const STATUS_MAPPING = {
  [Status.AMBIGUOUS]: "failed",
  [Status.FAILED]: "failed",
  [Status.PASSED]: "passed",
  [Status.PENDING]: "pending",
  [Status.SKIPPED]: "pending",
  [Status.UNDEFINED]: "pending"
};

const formatTestResult = ({
  config,
  globalConfig,
  testPath,
  eventDataCollector
}) => {
  const { displayName } = config;

  let numFailingTests = 0;
  let numPassingTests = 0;
  let numPendingTests = 0;

  const assertionResults = formatAssertionResults(eventDataCollector);

  const failureMessage = formatResultsErrors(
    assertionResults,
    config,
    globalConfig,
    testPath
  );

  assertionResults.forEach(({ status }) => {
    if (status === "failed") {
      numFailingTests++;
    } else if (status === "pending") {
      numPendingTests++;
    } else {
      numPassingTests++;
    }
  });

  return {
    console: null,
    displayName,
    failureMessage,
    leaks: false,
    numFailingTests,
    numPassingTests,
    numPendingTests,
    openHandles: [],
    perfStats: { end: 0, start: 0 },
    skipped: false,
    snapshot: {
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      unmatched: 0,
      updated: 0
    },
    sourceMaps: {},
    testFilePath: testPath,
    testResults: assertionResults
  };
};

const formatAssertionResults = eventDataCollector =>
  Object.entries(eventDataCollector.testCaseMap).reduce(
    (prevResults, [_uri, testCase]) => {
      const { gherkinDocument, pickle } = eventDataCollector.getTestCaseData(
        testCase.sourceLocation
      );

      const ancestorTitles = [
        `Feature: ${gherkinDocument.feature.name}`,
        `Scenario: ${pickle.name}`
      ];

      const results = testCase.steps
        .map(({ sourceLocation, result }, index) => {
          // Ignore hook execution results
          if (!sourceLocation) return;

          const { duration, status, exception } = result;

          const failureMessages = exception
            ? [exception.stack || exception.message]
            : [];

          const {
            gherkinKeyword,
            pickleStep
          } = eventDataCollector.getTestStepData({ testCase, index });

          // NOTE: locations order will change in the next gherkin version
          const [location] = pickleStep.locations.slice().reverse();

          const title = `${gherkinKeyword}${pickleStep.text}`;

          return {
            ancestorTitles,
            duration,
            failureMessages,
            fullName: title,
            invocations: 1,
            location,
            numPassingAsserts: 0,
            status: STATUS_MAPPING[status],
            title
          };
        })
        .filter(Boolean);

      return prevResults.concat(results);
    },
    []
  );

module.exports = { formatTestResult };
