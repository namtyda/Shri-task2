const parse = require('json-to-ast');
const { checkWarning} = require('./warningRules');
const { checkHeaders } = require('./headersRules');
const { checkGridProportions } = require('./gridRules');

const json = `{
  "block": "warning",
  "content": [
      {
          "block": "placeholder",
          "mods": { "size": "xl" }
      },
      {
          "elem": "content",
          "content": [
              {
                  "block": "text",
                  "mods": { "size": "m" }
              },
              {
                  "block": "text",
                  "mods": { "size": "l" }
              },
              { "block": "button", "mods": { "size": "s" } }
          ]
      }
  ]
}`;

const errors = [];
const ast = parse(json);


checkWarning(ast, errors);
checkGridProportions(ast, errors);
checkHeaders(ast, errors);


console.log(errors,{ depth: null});