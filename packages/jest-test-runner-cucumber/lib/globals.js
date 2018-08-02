const { supportCodeLibraryBuilder } = require("cucumber");

// We include all methods except AfterAll and BeforeAll
const {
  After,
  Before,
  defineParameterType,
  defineStep,
  defineSupportCode,
  Given,
  setDefaultTimeout,
  setDefinitionFunctionWrapper,
  setWorldConstructor,
  Then,
  When
} = supportCodeLibraryBuilder.methods;

module.exports = {
  After,
  Before,
  defineParameterType,
  defineStep,
  defineSupportCode,
  Given,
  setDefaultTimeout,
  setDefinitionFunctionWrapper,
  setWorldConstructor,
  Then,
  When
};
