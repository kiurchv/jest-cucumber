const expect = require("expect");

const setupExpect = (config) => {
  global.expect = expect;
  expect.setState({ expand: config.expand });
};

module.exports = { setupExpect };
