const parse = require('json-to-ast');
const { checkWarning } = require('./warningRules');
const { checkHeaders } = require('./headersRules');
const { checkGridProportions } = require('./gridRules');

// div
//     h1
//     h2
// div
//     h1
//     h2

const json = `[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
    
]`;


function lint(str) {
  const ast = parse(str);
  const errors = [];

  errors.push(...checkWarning(ast));
  errors.push(...checkGridProportions(ast));
  errors.push(...checkHeaders(ast));

  
  return errors;
}


globalThis.lint = lint;