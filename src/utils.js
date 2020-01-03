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

function getRelativeSize(size, step) {
  return SIZES[SIZES.indexOf(size) + step];
}

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
    return mod.value.value;
  }
}

function getLocation(node) {
  const loc = node.loc;

  return {
    start: { column: loc.start.column, line: loc.start.line },
    end: { column: loc.end.column, line: loc.end.line }
  };
}

module.exports = { getRelativeSize, findBlock, getModValue, getLocation };
