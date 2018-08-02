const setupEnvironment = ({ config, environment, runtime, globals }) => {
  if (config.timers === "fake") {
    environment.fakeTimers.useFakeTimers();
  }

  globals.Before(() => {
    if (config.resetModules) {
      runtime.resetModules();
    }

    if (config.clearMocks) {
      runtime.clearAllMocks();
    }

    if (config.resetMocks) {
      runtime.resetAllMocks();

      if (config.timers === "fake") {
        environment.fakeTimers.useFakeTimers();
      }
    }

    if (config.restoreMocks) {
      runtime.restoreAllMocks();
    }
  });

  if (config.setupTestFrameworkScriptFile) {
    runtime.requireModule(config.setupTestFrameworkScriptFile);
  }
};

module.exports = { setupEnvironment };
