const parse = require('json-to-ast');
const { checkWarning } = require('./warningRules');
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
                  "mods": { "type": "h2" }
              },
              {
                  "block": "text",
                  "mods": { "type": "h1" }
              },
              {
                  "block": "text",
                  "mods": { "type": "h1" }
              },
              { "block": "button", "mods": { "size": "s" } }
          ]
      }
  ]
}`;


function lint(str) {
    const ast = parse(str);
    const errors = [];

    checkWarning(ast, errors);
    checkGridProportions(ast, errors);
    checkHeaders(ast, errors);

    // console.dir(errors, { depth: null });
    return errors;
}

globalThis.lint = lint;