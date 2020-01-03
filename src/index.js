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
                "m-col": "4"
            },
            "content": [
                {
                    "block": "cover"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "6"
            },
            "content": [
                {
                    "block": "commercial"
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

    console.dir(errors, { depth: null });
    return errors;
}

lint(json)
globalThis.lint = lint;