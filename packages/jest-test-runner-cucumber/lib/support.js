const fg = require("fast-glob");
const SUPPORT_CODE_MATCH = ["**/__steps__/**/*.js", "**/__support__/**/*.js"];

const loadSupportFiles = async ({ config, runtime }) => {
  const supportFiles = await fg(SUPPORT_CODE_MATCH, {
    cwd: config.rootDir,
    ignore: ["node_modules"],
    absolute: true
  });

  supportFiles.forEach(file => runtime.requireModule(file));
};

module.exports = { loadSupportFiles };
