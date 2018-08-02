const path = require("path");
const EventEmitter = require("events");
const {
  supportCodeLibraryBuilder,
  getTestCasesFromFilesystem,
  formatterHelpers: { EventDataCollector },
  PickleFilter
} = require("cucumber");
const TestCaseRunner = require("cucumber/lib/runtime/test_case_runner").default;

const globals = require("./globals");

const prepare = (config) => {
  supportCodeLibraryBuilder.reset(config.cwd);
  Object.assign(global, globals);

  return { globals };
}

const finalize = () => supportCodeLibraryBuilder.finalize();

const runTestCases = async ({
  config,
  testPath,
  supportCodeLibrary
}) => {
  const eventBroadcaster = new EventEmitter();
  const eventDataCollector = new EventDataCollector(eventBroadcaster);

  const testCases = await getTestCasesFromFilesystem({
    cwd: config.cwd,
    eventBroadcaster,
    featurePaths: [testPath],
    order: "defined",
    pickleFilter: new PickleFilter({})
  });

  await testCases.reduce(async (prevTestCases, testCase) => {
    await prevTestCases;

    const testCaseRunner = new TestCaseRunner({
      eventBroadcaster,
      skip: false,
      supportCodeLibrary,
      testCase,
      worldParameters: {}
    });

    await testCaseRunner.run();
  }, Promise.resolve());

  return { eventDataCollector };
}

module.exports = { prepare, finalize, runTestCases };
