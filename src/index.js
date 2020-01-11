const parse = require('json-to-ast');
const { checkWarning } = require('./warningRules');
const { checkHeaders } = require('./headersRules');
const { checkGridProportions } = require('./gridRules');

function lint(str) {
  const ast = parse(str);
  const errors = [];

  errors.push(...checkHeaders(ast));
  errors.push(...checkWarning(ast));
  errors.push(...checkGridProportions(ast));

  return errors;
}

globalThis.lint = lint;
