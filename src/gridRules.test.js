const { checkGridProportions } = require('./gridRules');
const parse = require('json-to-ast');

describe('checkGridProportions', () => {
  it('should return empty errors array', () => {
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

    const ast = parse(json);
    const result = checkGridProportions(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('should return one error', () => {
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
                  "m-col": "2"
              },
              "content": [
                  {
                      "block": "payment"
                  }
              ]
          },
          {
              "block": "grid",
              "elem": "fraction",
              "elemMods": {
                  "m-col": "8"
              },
              "content": [
                  {
                      "block": "offer"
                  }
              ]
          }
      ]
    }`;

    const ast = parse(json);
    const result = checkGridProportions(ast);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
      error: "Маркетинговый блок занимает больше половины от всех колонок блока grid",
      location: {
        end: {
          column: 6,
          line: 32,
        },
        start: {
          column: 1,
          line: 1,
        },
      }
    });
  });
});

