const parse = require('json-to-ast');
const { checkWarning } = require('./warningRules');
const { checkHeaders } = require('./headersRules');
const { checkGridProportions } = require('./gridRules');

const json = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "payment"
                },
                {
                    "block": "text",
                    "mods": { "type": "h3" }
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            
            "content": [
                {
                    "block": "offer"
                },
                {
                    "block": "text",
                    "mods": { "type": "h1" }
                }
            ]
        }
    ]
 }`;


function lint(str) {
  const ast = parse(str);
  const errors = [];

  errors.push(...checkWarning(ast));
  errors.push(...checkGridProportions(ast));
  errors.push(...checkHeaders(ast));

  //   console.dir(errors, { depth: null });
  return errors;
}


globalThis.lint = lint;