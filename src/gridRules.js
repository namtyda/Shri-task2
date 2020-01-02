const { findBlock, getModValue, getLocation } = require('./utils');

function checkGridProportions(ast, errors) {
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
        error: "Маркетинговый блок занимает больше половины от всех колонок блока grid",
        location: getLocation(grid)
      });
    }
  })
}

function isMarketingFraction(node) {
  const commercialBlocksName = ['commercial', 'offer'];
  return commercialBlocksName.some(name => findBlock(node, name).length > 0);
}


module.exports = { checkGridProportions };
