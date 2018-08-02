const FRAMEWORK_ADAPTER = require.resolve("./adapter");
const SETUP_EXPECT = require.resolve("./expect");
const { setupEnvironment } = require("./environment");
const { loadSupportFiles } = require("./support");
const { formatTestResult } = require("./formatter");

const testRunner = async (
  globalConfig,
  config,
  environment,
  runtime,
  testPath
) => {
  const { prepare, finalize, runTestCases } = runtime.requireInternalModule(
    FRAMEWORK_ADAPTER
  );

  const { setupExpect } = runtime.requireInternalModule(SETUP_EXPECT);
  setupExpect(globalConfig);

  const { globals } = prepare(config);
  setupEnvironment({ config, environment, runtime, globals });
  await loadSupportFiles({ config, runtime });
  const supportCodeLibrary = finalize();

  const { eventDataCollector } = await runTestCases({ config, testPath, supportCodeLibrary });

  return formatTestResult({
    config,
    globalConfig,
    testPath,
    eventDataCollector
  });
};

module.exports = testRunner;
