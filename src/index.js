const parse = require('json-to-ast');
const { checkWarning } = require('./warningRules');
const { checkHeaders } = require('./headersRules');
const { checkGridProportions } = require('./gridRules');

// let json =
// `[
//     {
//         "block": "text",
//         "mods": { "type": "h3" }
//     },
//     {
//         "block": "text",
//         "mods": { "type": "h2" }
//     }
// ]`;
function lint(str) {

  const ast = parse(str);
  const errors = [];

  // errors.push(...checkWarning(ast));
  //   errors.push(...checkGridProportions(ast));
  errors.push(...checkHeaders(ast));


  //   console.dir(errors, { depth: null });
  return errors;
}
// lint(json);

globalThis.lint = lint;