const { checkWarning } = require('./warningRules');
const parse = require('json-to-ast');

describe('checkWarning', () => {
  it('[first rule] should return erros', () => {
    const json = `{
      "block": "warning",
      "content": [
          { "block": "text", "mods": { "size": "l" } },
          { "block": "text", "mods": { "size": "m" } }
      ]
  }`;
    const ast = parse(json);
    const result = checkWarning(ast);

    expect(result[0]).toEqual({
      code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
      error: 'Тексты в блоке warning должны быть одного размера',
      location: {
        end: {
          column: 4,
          line: 7,
        },
        start: {
          column: 1,
          line: 1,
        },
      },
    });
  });

  it('[second rules] should return erros', () => {
    const json = `{
      "block": "warning",
      "content": [
          { "block": "text", "mods": { "size": "l" } },
          { "block": "button", "mods": { "size": "s" } }
      ]
  }`;
    const ast = parse(json);
    const result = checkWarning(ast);

    expect(result[0]).toEqual({
      code: 'WARNING.INVALID_BUTTON_SIZE',
      error: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного',
      location: {
        end: {
          column: 57,
          line: 5,
        },
        start: {
          column: 11,
          line: 5,
        },
      },
    });
  });

  it('[third rules]should return erros', () => {
    const json = `{
      "block": "warning",
      "content": [
          { "block": "button", "mods": { "size": "m" } },
          { "block": "placeholder", "mods": { "size": "m" } }
      ]
  }`;
    const ast = parse(json);
    const result = checkWarning(ast);

    expect(result[0]).toEqual({
      code: 'WARNING.INVALID_BUTTON_POSITION',
      error: 'Блок button в блоке warning не может находиться перед блоком placeholder',
      location: {
        end: {
          column: 57,
          line: 4,
        },
        start: {
          column: 11,
          line: 4,
        },
      },
    });

  });

  it('[fourth rules]should return erros', () => {
    const json = `{
      "block": "warning",
      "content": [
          { "block": "placeholder", "mods": { "size": "xl" } }
      ]
  }`;
    const ast = parse(json);
    const result = checkWarning(ast);

    expect(result[0]).toEqual({
      code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
      error: 'Недопустимые размеры для блока placeholder в блоке warning',
      location: {
        end: {
          column: 63,
          line: 4,
        },
        start: {
          column: 11,
          line: 4,
        },
      },
    });
  });
  
  it('[first rule] should return empty array erros', () => {
    const json = `{
      "block": "warning",
      "content": [
          { "block": "text", "mods": { "size": "l" } },
          { "block": "text", "mods": { "size": "l" } }
      ]
  }`;
    const ast = parse(json);
    const result = checkWarning(ast);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('[second rule] should return empty array erros', () => {
    const json = `{
      "block": "warning",
      "content": [
          { "block": "text", "mods": { "size": "l" } },
          { "block": "button", "mods": { "size": "xl" } }
      ]
  }`;
    const ast = parse(json);
    const result = checkWarning(ast);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('[third rule] should return empty array erros', () => {
    const json = `{
      "block": "warning",
      "content": [
          { "block": "placeholder", "mods": { "size": "m" } },
          { "block": "button", "mods": { "size": "m" } }
      ]
  }`;
    const ast = parse(json);
    const result = checkWarning(ast);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('[fourth rule] should return empty array erros', () => {
    const json = `{
      "block": "warning",
      "content": [
          { "block": "placeholder", "mods": { "size": "m" } }
      ]
  }`;
    const ast = parse(json);
    const result = checkWarning(ast);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });
});
