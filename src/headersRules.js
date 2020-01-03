const { findBlock, getModValue, getLocation} = require('./utils');

function checkHeaders(ast, errors) {
  //first rule headers
  const texts = findBlock(ast, 'text')
  const headers = texts.filter(header => getModValue(header, 'type') === 'h1')
  if (headers.length > 1) {
    headers.slice(1).forEach(header => {
      errors.push({
        code: "TEXT.SEVERAL_H1",
        error: "Заголовок первого уровня блок text, с модификатором type h1, на странице должен быть единственным",
        location: getLocation(header)
      });
    });
  }

  //second rule headers
  checkPositionHeaders(texts, 'h1', 'h2', {
    code: "TEXT.INVALID_H2_POSITION",
    error: "Заголовок второго уровня блок text, с модификатором type h2, не может находиться перед заголовком первого уровня",
  }, errors);
  //third rule headers
  checkPositionHeaders(texts, 'h2', 'h3', {
    code: "TEXT.INVALID_H3_POSITION",
    error: "Заголовок третьего уровня блок text, с модификатором type h3, не может находиться перед заголовком второго уровня",
  });
}

// first — это тот, который должен идти до second
function checkPositionHeaders(texts, firstBlockTypeName, secondBlockTypeName, error, errors) {
 
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

module.exports = {checkHeaders};
