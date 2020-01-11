const { findBlock, getModValue, getLocation } = require('./utils');

function checkHeaders(ast) {
  const errors = [];
  const texts = findBlock(ast, 'text');
  const context = {};
  texts.forEach(header => {
    if (getModValue(header, 'type') === 'h1') {
      if (context.h1) {
        errors.push({
          code: 'TEXT.SEVERAL_H1',
          error: 'Заголовок первого уровня блок text, с модификатором type h1, на странице должен быть единственным',
          location: getLocation(header)
        });
      } else {

        context.h1 = header;
      }
    }

    if (getModValue(header, 'type') === 'h2') {
      context.h2 = header;
    } else if (getModValue(header, 'type') === 'h1' && context.h2 && getLocation(context.h1).start.column >= getLocation(context.h2).start.column) {
      errors.push({
        code: 'TEXT.INVALID_H2_POSITION',
        error: 'Заголовок второго уровня блок text, с модификатором type h2, не может находиться перед заголовком первого уровня',
        location: getLocation(context.h2)
      });
    }

    if (getModValue(header, 'type') === 'h3') {
      context.h3 = header;
    } else if (getModValue(header, 'type') === 'h2' && context.h3 && getLocation(context.h2).start.column >= getLocation(context.h3).start.column) {
      errors.push({
        code: 'TEXT.INVALID_H3_POSITION',
        error: 'Заголовок третьего уровня блок text, с модификатором type h3, не может находиться перед заголовком второго уровня',
        location: getLocation(context.h3)
      });
    }
  });

  return errors;
}

module.exports = { checkHeaders };
