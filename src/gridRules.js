const { findBlock, getModValue, getLocation } = require('./utils');

function checkGridProportions(ast) {
  const errors = [];
  const grids = findBlock(ast, 'grid');

  grids.forEach(grid => {
    const content = grid.children.find(({ key }) => key.value === 'content');
    const children = content.value.children;
    const modGrid = getModValue(grid, 'm-columns');
    
    let badCount = 0;
    children.forEach(fraction => {
      if (isMarketingFraction(fraction)) {
        badCount += Number(getModValue(fraction, 'm-col', true));
      }
    });
    if (badCount > ( modGrid / 2)) {
      errors.push({
        code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
        error: 'Маркетинговый блок занимает больше половины от всех колонок блока grid',
        location: getLocation(grid)
      });
    }
  });
  return errors;
}

function isMarketingFraction(node) {
  const commercialBlocksName = ['commercial', 'offer'];
  return commercialBlocksName.some(name => findBlock(node, name).length > 0);
}


module.exports = { checkGridProportions };
