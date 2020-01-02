const SIZES = [
  'xxxs',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  'xxxl',
  'xxxxl',
  'xxxxxl'
];

const placeholderSize = [
  's',
  'm',
  'l'
];

function getRelativeSize(size, step) {
  return SIZES[SIZES.indexOf(size) + step];
}

const parse = require('json-to-ast');

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
}
`;

function findBlock(node, blockName) {
  if (node.type === 'Array') {
    return node.children.map(child => findBlock(child, blockName)).reduce((acc, arr) => [...acc, ...arr], []);
  }
  const result = [];
  if (node.children) {
    const block = node.children.find(({ key, value }) => key.value === 'block' && value.value === blockName);
    const elem = node.children.find(({ key }) => key.value === 'elem');
    if (block && !elem) {
      result.push(node);
    }

    const content = node.children.find(({ key }) => key.value === 'content');
    if (content) {
      content.value.children.forEach(contentNode => result.push(...findBlock(contentNode, blockName)));
    }
  }
  return result;
}

const errors = [];
const ast = parse(json);

function checkWarning(ast) {
  const warnings = findBlock(ast, 'warning');

  warnings.forEach((warning) => {

    // first rule warning
    const texts = findBlock(warning, 'text');
    const firstBlockModValue = getModValue(texts[0], 'size');
    if (texts.length > 0) {
      if (firstBlockModValue === null || !texts.every(text => getModValue(text, 'size') === firstBlockModValue)) {
        errors.push({
          code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
          error: "Тексты в блоке warning должны быть одного размера",
          location: getLocation(warning)
        });
      }
    }

    // second rule warning
    const buttons = findBlock(warning, 'button')
    if (firstBlockModValue) {
      buttons.forEach(button => {
        if (getModValue(button, 'size') !== getRelativeSize(firstBlockModValue, 1)) {
          errors.push({
            code: "WARNING.INVALID_BUTTON_SIZE",
            error: "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
            location: getLocation(button)
          });
        }
      });
    }

    //third rule warning
    const placeHolderSearchPosition = findBlock(warning, 'placeholder')
    for (const btn of buttons) {
      if (placeHolderSearchPosition.some(placeHolder => getLocation(btn).start.line < getLocation(placeHolder).start.line)) {
        errors.push({
          code: "WARNING.INVALID_BUTTON_POSITION",
          error: "Блок button в блоке warning не может находиться перед блоком placeholder",
          location: getLocation(btn)
        })
      }
    }

    // fourth rule warning
    const placeHolders = findBlock(warning, 'placeholder');
    placeHolders.forEach(place => {
      if (!placeholderSize.includes(getModValue(place, 'size'))) {
        errors.push({
          code: "WARNING.INVALID_PLACEHOLDER_SIZE",
          error: "Недопустимые размеры для блока placeholder в блоке warning",
          location: getLocation(place)
        });
      }
    });
  });
}
checkWarning(ast)

function checkHeaders(ast) {
  const texts = findBlock(ast, 'text')
  const headers = texts.filter(header => getModValue(header, 'type') === 'h1')
  if (headers.length > 1) {
    headers.slice(1).forEach(header => {
      errors.push({
        code: "TEXT.SEVERAL_H1",
        error: "Заголовок первого уровня блок text, с модификатором type h1, на странице должен быть единственным",
        location: getLocation(header)
      });
    })
  }

  //second rule headers
  checkPositionHeaders(texts, 'h1', 'h2', {
    code: "TEXT.INVALID_H2_POSITION",
    error: "Заголовок второго уровня блок text, с модификатором type h2, не может находиться перед заголовком первого уровня",
  })
  //third rule headers
  checkPositionHeaders(texts, 'h2', 'h3', {
    code: "TEXT.INVALID_H3_POSITION",
    error: "Заголовок третьего уровня блок text, с модификатором type h3, не может находиться перед заголовком второго уровня",
  })

}
checkHeaders(ast)


// first — это тот, который должен идти до second
function checkPositionHeaders(texts, firstBlockTypeName, secondBlockTypeName, error) {
  const firsts = texts.filter(header => getModValue(header, 'type') === firstBlockTypeName)
  const seconds = texts.filter(header => getModValue(header, 'type') === secondBlockTypeName)
  for (const header of seconds) {
    if (firsts.some(head => getLocation(header).start.line < getLocation(head).start.line)) {
      errors.push({
        ...error,
        location: getLocation(header)
      });
    }
  }
}

function checkGridProportions(ast) {
  const grids = findBlock(ast, 'grid');

  grids.forEach(grid => {
    const content = grid.children.find(({ key }) => key.value === 'content');
    const children = content.value.children
    let goodCount = 0;
    let badCount = 0;
    children.forEach(fraction => {
      if (isMarketingFraction(fraction)) {
        badCount += Number(getModValue(fraction, 'm-col', true));
      } else {
        goodCount += Number(getModValue(fraction, 'm-col', true));
      }
    });
    if (badCount > goodCount) {
      errors.push({
        code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
        error: "Маркетинговые блок занимает больше половины от всех колонко блока grid",
        location: getLocation(grid)
      });
    }
  })
}

function isMarketingFraction(node) {
  const commercialBlocksName = ['commercial', 'offer'];
  return commercialBlocksName.some(name => findBlock(node, name).length > 0);
}


checkGridProportions(ast)
console.dir(errors, { depth: null });

function getModValue(block, modName, isElem = false) {
  if (block) {
    const mods = block.children.find(obj => obj.key.value === (isElem ? 'elemMods' : 'mods'));
    if (!mods) {
      return null;
    }
    const mod = mods.value.children.find(obj => obj.key.value === modName);
    if (!mod) {
      return null;
    }
    return mod.value.value
  }
}

function getLocation(node) {
  const loc = node.loc;

  return {
    start: { column: loc.start.column, line: loc.start.line },
    end: { column: loc.end.column, line: loc.end.line }
  }
}