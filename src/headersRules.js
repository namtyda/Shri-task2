const { findBlock, getModValue, getLocation } = require('./utils');

function checkHeaders(ast) {
  const errors = [];
  //first rule headers
  const texts = findBlock(ast, 'text');
  // const headers = texts.filter(header => getModValue(header, 'type') === 'h1');
  // if (headers.length > 1) {
  //   headers.slice(1).forEach(header => {
  //     errors.push({
  //       code: 'TEXT.SEVERAL_H1',
  //       error: 'Заголовок первого уровня блок text, с модификатором type h1, на странице должен быть единственным',
  //       location: getLocation(header)
  //     });
  //   });
  // }

  // const fs = require('fs');
  // fs.writeFileSync('stub', JSON.stringify(ast, null, 2));	

  function check(texts) {
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


  }
  check(texts);

  // second rule headers
  // errors.push(...checkPositionHeaders(texts, 'h1', 'h2', {
  //   code: 'TEXT.INVALID_H2_POSITION',
  //   error: 'Заголовок второго уровня блок text, с модификатором type h2, не может находиться перед заголовком первого уровня',
  // }));

  // third rule headers
  // errors.push(...checkPositionHeaders(texts, 'h2', 'h3', {
  //   code: 'TEXT.INVALID_H3_POSITION',
  //   error: 'Заголовок третьего уровня блок text, с модификатором type h3, не может находиться перед заголовком второго уровня',
  // }));
  return errors;
}

// first — это тот, который должен идти до second
// function checkPositionHeaders(texts, firstBlockTypeName, secondBlockTypeName, error) {
//   const errors = [];
//   const firsts = texts.filter(header => getModValue(header, 'type') === firstBlockTypeName);
//   const seconds = texts.filter(header => getModValue(header, 'type') === secondBlockTypeName);
//   for (const header of seconds) {
//     if (firsts.some(head => getLocation(header).start.line < getLocation(head).start.line && getLocation(header).start.column <= getLocation(head).start.column)) {
//       errors.push({
//         ...error,
//         location: getLocation(header)
//       });
//     }
//   }
//   return errors;
// }

module.exports = { checkHeaders };