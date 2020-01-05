const parse = require('json-to-ast');
const { checkWarning } = require('./warningRules');
const { checkHeaders } = require('./headersRules');
const { checkGridProportions } = require('./gridRules');

let json =
`[
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
        "mods": { "type": "p" },
        "content": [
            {
                "block": "text",
                "mods": { "type": "h1" }
            }
        ]
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