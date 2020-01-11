const { checkHeaders} = require('./headersRules');
const parse = require('json-to-ast');


describe('checkHeaders', () => {
  it('[first rule]should return one error', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h1" }
      },
      {
          "block": "text",
          "mods": { "type": "h1" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      code: 'TEXT.SEVERAL_H1',
      error: 'Заголовок первого уровня блок text, с модификатором type h1, на странице должен быть единственным',
      location: {
        end: {
          column: 8,
          line: 9,
        },
        start: {
          column: 7,
          line: 6,
        },
      }
    });
  });

  it('[second rule]should return one error', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h2" }
      },
      {
          "block": "text",
          "mods": { "type": "h1" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      code: 'TEXT.INVALID_H2_POSITION',
      error: 'Заголовок второго уровня блок text, с модификатором type h2, не может находиться перед заголовком первого уровня',
      location: {
        end: {
          column: 8,
          line: 5,
        },
        start: {
          column: 7,
          line: 2,
        },
      }
    });
  });

  it('[third rule]should return one error', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h3" }
      },
      {
          "block": "text",
          "mods": { "type": "h2" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      code: 'TEXT.INVALID_H3_POSITION',
      error: 'Заголовок третьего уровня блок text, с модификатором type h3, не может находиться перед заголовком второго уровня',
      location: {
        end: {
          column: 8,
          line: 5,
        },
        start: {
          column: 7,
          line: 2,
        },
      },
    });
  });

  it('[first rule]should return empty array errors', () => {
    const json = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;


    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('[second rule]should return empty array errors', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h1" }
      },
      {
          "block": "text",
          "mods": { "type": "h2" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('[third rule]should return empty array errors', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h2" }
      },
      {
          "block": "text",
          "mods": { "type": "h3" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

});
