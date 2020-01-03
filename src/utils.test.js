const { getRelativeSize, findBlock, getModValue, getLocation } = require('./utils');
const parse = require('json-to-ast');

describe('getRelativeSize', () => {
  it('should return string value', () => {

    const result = getRelativeSize('m', 1);
    expect(typeof result).toBe('string');
    expect(result).toBe('l');
  });
});

describe('findBlock', () => {
  it('should return array nodes', () => {
    const str = `[
      {
          "block": "text",
          "mods": { "type": "h1" }
      },
      {
          "block": "text",
          "mods": { "type": "h2" }
      }
  ]`;
    const ast = parse(str);
    const result = findBlock(ast, 'text');
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([{'children':[{'key':{'loc':{'end':{'column':18,'line':3,'offset':27},'source':null,'start':{'column':11,'line':3,'offset':20}},'raw':'"block"','type':'Identifier','value':'block'},'loc':{'end':{'column':26,'line':3,'offset':35},'source':null,'start':{'column':11,'line':3,'offset':20}},'type':'Property','value':{'loc':{'end':{'column':26,'line':3,'offset':35},'source':null,'start':{'column':20,'line':3,'offset':29}},'raw':'"text"','type':'Literal','value':'text'}},{'key':{'loc':{'end':{'column':17,'line':4,'offset':53},'source':null,'start':{'column':11,'line':4,'offset':47}},'raw':'"mods"','type':'Identifier','value':'mods'},'loc':{'end':{'column':35,'line':4,'offset':71},'source':null,'start':{'column':11,'line':4,'offset':47}},'type':'Property','value':{'children':[{'key':{'loc':{'end':{'column':27,'line':4,'offset':63},'source':null,'start':{'column':21,'line':4,'offset':57}},'raw':'"type"','type':'Identifier','value':'type'},'loc':{'end':{'column':33,'line':4,'offset':69},'source':null,'start':{'column':21,'line':4,'offset':57}},'type':'Property','value':{'loc':{'end':{'column':33,'line':4,'offset':69},'source':null,'start':{'column':29,'line':4,'offset':65}},'raw':'"h1"','type':'Literal','value':'h1'}}],'loc':{'end':{'column':35,'line':4,'offset':71},'source':null,'start':{'column':19,'line':4,'offset':55}},'type':'Object'}}],'loc':{'end':{'column':8,'line':5,'offset':79},'source':null,'start':{'column':7,'line':2,'offset':8}},'type':'Object'},{'children':[{'key':{'loc':{'end':{'column':18,'line':7,'offset':106},'source':null,'start':{'column':11,'line':7,'offset':99}},'raw':'"block"','type':'Identifier','value':'block'},'loc':{'end':{'column':26,'line':7,'offset':114},'source':null,'start':{'column':11,'line':7,'offset':99}},'type':'Property','value':{'loc':{'end':{'column':26,'line':7,'offset':114},'source':null,'start':{'column':20,'line':7,'offset':108}},'raw':'"text"','type':'Literal','value':'text'}},{'key':{'loc':{'end':{'column':17,'line':8,'offset':132},'source':null,'start':{'column':11,'line':8,'offset':126}},'raw':'"mods"','type':'Identifier','value':'mods'},'loc':{'end':{'column':35,'line':8,'offset':150},'source':null,'start':{'column':11,'line':8,'offset':126}},'type':'Property','value':{'children':[{'key':{'loc':{'end':{'column':27,'line':8,'offset':142},'source':null,'start':{'column':21,'line':8,'offset':136}},'raw':'"type"','type':'Identifier','value':'type'},'loc':{'end':{'column':33,'line':8,'offset':148},'source':null,'start':{'column':21,'line':8,'offset':136}},'type':'Property','value':{'loc':{'end':{'column':33,'line':8,'offset':148},'source':null,'start':{'column':29,'line':8,'offset':144}},'raw':'"h2"','type':'Literal','value':'h2'}}],'loc':{'end':{'column':35,'line':8,'offset':150},'source':null,'start':{'column':19,'line':8,'offset':134}},'type':'Object'}}],'loc':{'end':{'column':8,'line':9,'offset':158},'source':null,'start':{'column':7,'line':6,'offset':87}},'type':'Object'}]);
  });
});

describe('getModValue', () => {
  it('should be return string value', () => {
    const block = {
      type: 'Object',
      children: [
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            value: 'block',
            raw: '"block"',
            loc: {
              start: { line: 3, column: 9, offset: 16 },
              end: { line: 3, column: 16, offset: 23 },
              source: null
            }
          },
          value: {
            type: 'Literal',
            value: 'text',
            raw: '"text"',
            loc: {
              start: { line: 3, column: 18, offset: 25 },
              end: { line: 3, column: 24, offset: 31 },
              source: null
            }
          },
          loc: {
            start: { line: 3, column: 9, offset: 16 },
            end: { line: 3, column: 24, offset: 31 },
            source: null
          }
        },
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            value: 'mods',
            raw: '"mods"',
            loc: {
              start: { line: 4, column: 9, offset: 41 },
              end: { line: 4, column: 15, offset: 47 },
              source: null
            }
          },
          value: {
            type: 'Object',
            children: [
              {
                type: 'Property',
                key: {
                  type: 'Identifier',
                  value: 'type',
                  raw: '"type"',
                  loc: {
                    start: { line: 4, column: 19, offset: 51 },
                    end: { line: 4, column: 25, offset: 57 },
                    source: null
                  }
                },
                value: {
                  type: 'Literal',
                  value: 'h1',
                  raw: '"h1"',
                  loc: {
                    start: { line: 4, column: 27, offset: 59 },
                    end: { line: 4, column: 31, offset: 63 },
                    source: null
                  }
                },
                loc: {
                  start: { line: 4, column: 19, offset: 51 },
                  end: { line: 4, column: 31, offset: 63 },
                  source: null
                }
              }
            ],
            loc: {
              start: { line: 4, column: 17, offset: 49 },
              end: { line: 4, column: 33, offset: 65 },
              source: null
            }
          },
          loc: {
            start: { line: 4, column: 9, offset: 41 },
            end: { line: 4, column: 33, offset: 65 },
            source: null
          }
        }
      ],
      loc: {
        start: { line: 2, column: 5, offset: 6 },
        end: { line: 5, column: 6, offset: 71 },
        source: null
      }
    };

    const result = getModValue(block, 'type');
    expect(typeof result).toBe('string');
    expect(result).toBe('h1');
  });

  it('should return value string with iseElem = true', () => {
    const element = { 'type': 'Object', 'children': [{ 'type': 'Property', 'key': { 'type': 'Identifier', 'value': 'block', 'raw': '"block"', 'loc': { 'start': { 'line': 20, 'column': 13, 'offset': 375 }, 'end': { 'line': 20, 'column': 20, 'offset': 382 }, 'source': null } }, 'value': { 'type': 'Literal', 'value': 'grid', 'raw': '"grid"', 'loc': { 'start': { 'line': 20, 'column': 22, 'offset': 384 }, 'end': { 'line': 20, 'column': 28, 'offset': 390 }, 'source': null } }, 'loc': { 'start': { 'line': 20, 'column': 13, 'offset': 375 }, 'end': { 'line': 20, 'column': 28, 'offset': 390 }, 'source': null } }, { 'type': 'Property', 'key': { 'type': 'Identifier', 'value': 'elem', 'raw': '"elem"', 'loc': { 'start': { 'line': 21, 'column': 13, 'offset': 404 }, 'end': { 'line': 21, 'column': 19, 'offset': 410 }, 'source': null } }, 'value': { 'type': 'Literal', 'value': 'fraction', 'raw': '"fraction"', 'loc': { 'start': { 'line': 21, 'column': 21, 'offset': 412 }, 'end': { 'line': 21, 'column': 31, 'offset': 422 }, 'source': null } }, 'loc': { 'start': { 'line': 21, 'column': 13, 'offset': 404 }, 'end': { 'line': 21, 'column': 31, 'offset': 422 }, 'source': null } }, { 'type': 'Property', 'key': { 'type': 'Identifier', 'value': 'elemMods', 'raw': '"elemMods"', 'loc': { 'start': { 'line': 22, 'column': 13, 'offset': 436 }, 'end': { 'line': 22, 'column': 23, 'offset': 446 }, 'source': null } }, 'value': { 'type': 'Object', 'children': [{ 'type': 'Property', 'key': { 'type': 'Identifier', 'value': 'm-col', 'raw': '"m-col"', 'loc': { 'start': { 'line': 23, 'column': 17, 'offset': 466 }, 'end': { 'line': 23, 'column': 24, 'offset': 473 }, 'source': null } }, 'value': { 'type': 'Literal', 'value': '2', 'raw': '"2"', 'loc': { 'start': { 'line': 23, 'column': 26, 'offset': 475 }, 'end': { 'line': 23, 'column': 29, 'offset': 478 }, 'source': null } }, 'loc': { 'start': { 'line': 23, 'column': 17, 'offset': 466 }, 'end': { 'line': 23, 'column': 29, 'offset': 478 }, 'source': null } }], 'loc': { 'start': { 'line': 22, 'column': 25, 'offset': 448 }, 'end': { 'line': 24, 'column': 14, 'offset': 492 }, 'source': null } }, 'loc': { 'start': { 'line': 22, 'column': 13, 'offset': 436 }, 'end': { 'line': 24, 'column': 14, 'offset': 492 }, 'source': null } }, { 'type': 'Property', 'key': { 'type': 'Identifier', 'value': 'content', 'raw': '"content"', 'loc': { 'start': { 'line': 25, 'column': 13, 'offset': 506 }, 'end': { 'line': 25, 'column': 22, 'offset': 515 }, 'source': null } }, 'value': { 'type': 'Array', 'children': [{ 'type': 'Object', 'children': [{ 'type': 'Property', 'key': { 'type': 'Identifier', 'value': 'block', 'raw': '"block"', 'loc': { 'start': { 'line': 27, 'column': 21, 'offset': 557 }, 'end': { 'line': 27, 'column': 28, 'offset': 564 }, 'source': null } }, 'value': { 'type': 'Literal', 'value': 'offer', 'raw': '"offer"', 'loc': { 'start': { 'line': 27, 'column': 30, 'offset': 566 }, 'end': { 'line': 27, 'column': 37, 'offset': 573 }, 'source': null } }, 'loc': { 'start': { 'line': 27, 'column': 21, 'offset': 557 }, 'end': { 'line': 27, 'column': 37, 'offset': 573 }, 'source': null } }], 'loc': { 'start': { 'line': 26, 'column': 17, 'offset': 535 }, 'end': { 'line': 28, 'column': 18, 'offset': 591 }, 'source': null } }], 'loc': { 'start': { 'line': 25, 'column': 24, 'offset': 517 }, 'end': { 'line': 29, 'column': 14, 'offset': 605 }, 'source': null } }, 'loc': { 'start': { 'line': 25, 'column': 13, 'offset': 506 }, 'end': { 'line': 29, 'column': 14, 'offset': 605 }, 'source': null } }], 'loc': { 'start': { 'line': 19, 'column': 9, 'offset': 361 }, 'end': { 'line': 30, 'column': 10, 'offset': 615 }, 'source': null } };
    const result = getModValue(element, 'm-col', true);
    expect(typeof result).toBe('string');
    expect(result).toBe('2');
  });
});

describe('getLocation', () => {
  it('should return object location', () => {
    const str = `{
      "block": "warning",
      "content": [
          {
              "block": "placeholder",
              "mods": { "size": "m" }
          },
          {
              "elem": "content",
              "content": [
                  {
                      "block": "text",
                      "mods": { "size": "m" }
                  },
                  {
                      "block": "text",
                      "mods": { "size": "l" }
                  }
              ]
          }
      ]
  }`;
    const ast = parse(str);
    const result = getLocation(ast);
    expect(result).toBeInstanceOf(Object);
    expect(result).toEqual({ start: { column: 1, line: 1 }, end: { column: 4, line: 22 } });
  });
});
