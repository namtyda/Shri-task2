const { getRelativeSize, findBlock, getModValue, getLocation} = require('./utils');
const placeholderSize = [
  's',
  'm',
  'l'
];

function checkWarning(ast, errors) {
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

module.exports = { checkWarning };
