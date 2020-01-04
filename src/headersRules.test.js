const { checkHeaders, checkPositionHeaders } = require('./headersRules');
const parse = require('json-to-ast');


describe('checkHeaders', () => {
  it('[first rule]should return one error', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h1" }
      },
      {
          "block": "text",
          "mods": { "type": "h1" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      code: 'TEXT.SEVERAL_H1',
      error: 'Заголовок первого уровня блок text, с модификатором type h1, на странице должен быть единственным',
      location: {
        end: {
          column: 8,
          line: 9,
        },
        start: {
          column: 7,
          line: 6,
        },
      }
    });
  });

  it('[second rule]should return one error', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h2" }
      },
      {
          "block": "text",
          "mods": { "type": "h1" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      code: 'TEXT.INVALID_H2_POSITION',
      error: 'Заголовок второго уровня блок text, с модификатором type h2, не может находиться перед заголовком первого уровня',
      location: {
        end: {
          column: 8,
          line: 5,
        },
        start: {
          column: 7,
          line: 2,
        },
      }
    });
  });

  it('[third rule]should return one error', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h3" }
      },
      {
          "block": "text",
          "mods": { "type": "h2" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      code: 'TEXT.INVALID_H3_POSITION',
      error: 'Заголовок третьего уровня блок text, с модификатором type h3, не может находиться перед заголовком второго уровня',
      location: {
        end: {
          column: 8,
          line: 5,
        },
        start: {
          column: 7,
          line: 2,
        },
      },
    });
  });

  it('[third rule[2]]should return one error', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h3" }
      },
      {
          "block": "text",
          "mods": { "type": "h1" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      code: 'TEXT.INVALID_H3_POSITION',
      error: 'Заголовок третьего уровня блок text, с модификатором type h3, не может находиться перед заголовком первого уровня',
      location: {
        end: {
          column: 8,
          line: 5,
        },
        start: {
          column: 7,
          line: 2,
        },
      },
    });
  });

  it('[first rule]should return empty array errors', () => {
    const json = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;


    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('[second rule]should return empty array errors', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h1" }
      },
      {
          "block": "text",
          "mods": { "type": "h2" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it('[third rule]should return empty array errors', () => {
    const json = `[
      {
          "block": "text",
          "mods": { "type": "h2" }
      },
      {
          "block": "text",
          "mods": { "type": "h3" }
      }
  ]`;

    const ast = parse(json);
    const result = checkHeaders(ast);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

});


// describe('checkPositionHeaders', () => {
//   it('should return error', () => {
//     const texts = [
//       {
//         'type': 'Object',
//         'children': [
//           {
//             'type': 'Property',
//             'key': {
//               'type': 'Identifier',
//               'value': 'block',
//               'raw': '"block"',
//               'loc': {
//                 'start': {
//                   'line': 3,
//                   'column': 9,
//                   'offset': 16
//                 },
//                 'end': {
//                   'line': 3,
//                   'column': 16,
//                   'offset': 23
//                 },
//                 'source': null
//               }
//             },
//             'value': {
//               'type': 'Literal',
//               'value': 'text',
//               'raw': '"text"',
//               'loc': {
//                 'start': {
//                   'line': 3,
//                   'column': 18,
//                   'offset': 25
//                 },
//                 'end': {
//                   'line': 3,
//                   'column': 24,
//                   'offset': 31
//                 },
//                 'source': null
//               }
//             },
//             'loc': {
//               'start': {
//                 'line': 3,
//                 'column': 9,
//                 'offset': 16
//               },
//               'end': {
//                 'line': 3,
//                 'column': 24,
//                 'offset': 31
//               },
//               'source': null
//             }
//           },
//           {
//             'type': 'Property',
//             'key': {
//               'type': 'Identifier',
//               'value': 'mods',
//               'raw': '"mods"',
//               'loc': {
//                 'start': {
//                   'line': 4,
//                   'column': 9,
//                   'offset': 41
//                 },
//                 'end': {
//                   'line': 4,
//                   'column': 15,
//                   'offset': 47
//                 },
//                 'source': null
//               }
//             },
//             'value': {
//               'type': 'Object',
//               'children': [
//                 {
//                   'type': 'Property',
//                   'key': {
//                     'type': 'Identifier',
//                     'value': 'type',
//                     'raw': '"type"',
//                     'loc': {
//                       'start': {
//                         'line': 4,
//                         'column': 19,
//                         'offset': 51
//                       },
//                       'end': {
//                         'line': 4,
//                         'column': 25,
//                         'offset': 57
//                       },
//                       'source': null
//                     }
//                   },
//                   'value': {
//                     'type': 'Literal',
//                     'value': 'h3',
//                     'raw': '"h3"',
//                     'loc': {
//                       'start': {
//                         'line': 4,
//                         'column': 27,
//                         'offset': 59
//                       },
//                       'end': {
//                         'line': 4,
//                         'column': 31,
//                         'offset': 63
//                       },
//                       'source': null
//                     }
//                   },
//                   'loc': {
//                     'start': {
//                       'line': 4,
//                       'column': 19,
//                       'offset': 51
//                     },
//                     'end': {
//                       'line': 4,
//                       'column': 31,
//                       'offset': 63
//                     },
//                     'source': null
//                   }
//                 }
//               ],
//               'loc': {
//                 'start': {
//                   'line': 4,
//                   'column': 17,
//                   'offset': 49
//                 },
//                 'end': {
//                   'line': 4,
//                   'column': 33,
//                   'offset': 65
//                 },
//                 'source': null
//               }
//             },
//             'loc': {
//               'start': {
//                 'line': 4,
//                 'column': 9,
//                 'offset': 41
//               },
//               'end': {
//                 'line': 4,
//                 'column': 33,
//                 'offset': 65
//               },
//               'source': null
//             }
//           }
//         ],
//         'loc': {
//           'start': {
//             'line': 2,
//             'column': 5,
//             'offset': 6
//           },
//           'end': {
//             'line': 5,
//             'column': 6,
//             'offset': 71
//           },
//           'source': null
//         }
//       },
//       {
//         'type': 'Object',
//         'children': [
//           {
//             'type': 'Property',
//             'key': {
//               'type': 'Identifier',
//               'value': 'block',
//               'raw': '"block"',
//               'loc': {
//                 'start': {
//                   'line': 7,
//                   'column': 9,
//                   'offset': 87
//                 },
//                 'end': {
//                   'line': 7,
//                   'column': 16,
//                   'offset': 94
//                 },
//                 'source': null
//               }
//             },
//             'value': {
//               'type': 'Literal',
//               'value': 'text',
//               'raw': '"text"',
//               'loc': {
//                 'start': {
//                   'line': 7,
//                   'column': 18,
//                   'offset': 96
//                 },
//                 'end': {
//                   'line': 7,
//                   'column': 24,
//                   'offset': 102
//                 },
//                 'source': null
//               }
//             },
//             'loc': {
//               'start': {
//                 'line': 7,
//                 'column': 9,
//                 'offset': 87
//               },
//               'end': {
//                 'line': 7,
//                 'column': 24,
//                 'offset': 102
//               },
//               'source': null
//             }
//           },
//           {
//             'type': 'Property',
//             'key': {
//               'type': 'Identifier',
//               'value': 'mods',
//               'raw': '"mods"',
//               'loc': {
//                 'start': {
//                   'line': 8,
//                   'column': 9,
//                   'offset': 112
//                 },
//                 'end': {
//                   'line': 8,
//                   'column': 15,
//                   'offset': 118
//                 },
//                 'source': null
//               }
//             },
//             'value': {
//               'type': 'Object',
//               'children': [
//                 {
//                   'type': 'Property',
//                   'key': {
//                     'type': 'Identifier',
//                     'value': 'type',
//                     'raw': '"type"',
//                     'loc': {
//                       'start': {
//                         'line': 8,
//                         'column': 19,
//                         'offset': 122
//                       },
//                       'end': {
//                         'line': 8,
//                         'column': 25,
//                         'offset': 128
//                       },
//                       'source': null
//                     }
//                   },
//                   'value': {
//                     'type': 'Literal',
//                     'value': 'h2',
//                     'raw': '"h2"',
//                     'loc': {
//                       'start': {
//                         'line': 8,
//                         'column': 27,
//                         'offset': 130
//                       },
//                       'end': {
//                         'line': 8,
//                         'column': 31,
//                         'offset': 134
//                       },
//                       'source': null
//                     }
//                   },
//                   'loc': {
//                     'start': {
//                       'line': 8,
//                       'column': 19,
//                       'offset': 122
//                     },
//                     'end': {
//                       'line': 8,
//                       'column': 31,
//                       'offset': 134
//                     },
//                     'source': null
//                   }
//                 }
//               ],
//               'loc': {
//                 'start': {
//                   'line': 8,
//                   'column': 17,
//                   'offset': 120
//                 },
//                 'end': {
//                   'line': 8,
//                   'column': 33,
//                   'offset': 136
//                 },
//                 'source': null
//               }
//             },
//             'loc': {
//               'start': {
//                 'line': 8,
//                 'column': 9,
//                 'offset': 112
//               },
//               'end': {
//                 'line': 8,
//                 'column': 33,
//                 'offset': 136
//               },
//               'source': null
//             }
//           }
//         ],
//         'loc': {
//           'start': {
//             'line': 6,
//             'column': 5,
//             'offset': 77
//           },
//           'end': {
//             'line': 9,
//             'column': 6,
//             'offset': 142
//           },
//           'source': null
//         }
//       }
//     ];
//     const result = checkPositionHeaders(texts, 'h2', 'h3', {});
//     expect(result).toBeInstanceOf(Array);
//     expect(result.length).toBe(1);

//     const error = {
//       a: 'a',
//       b: 'b'
//     };
//     const result2 = checkPositionHeaders(texts, 'h2', 'h3', error);
//     expect(result2).toBeInstanceOf(Array);
//     expect(result2[0]).toEqual(expect.objectContaining({
//       a: 'a',
//       b: 'b',
//       location: expect.any(Object),
//     }));

//   });

//   it('should no erros', () => {
//     const texts = [
//       {
//         'type': 'Object',
//         'children': [
//           {
//             'type': 'Property',
//             'key': {
//               'type': 'Identifier',
//               'value': 'block',
//               'raw': '"block"',
//               'loc': {
//                 'start': {
//                   'line': 3,
//                   'column': 9,
//                   'offset': 16
//                 },
//                 'end': {
//                   'line': 3,
//                   'column': 16,
//                   'offset': 23
//                 },
//                 'source': null
//               }
//             },
//             'value': {
//               'type': 'Literal',
//               'value': 'text',
//               'raw': '"text"',
//               'loc': {
//                 'start': {
//                   'line': 3,
//                   'column': 18,
//                   'offset': 25
//                 },
//                 'end': {
//                   'line': 3,
//                   'column': 24,
//                   'offset': 31
//                 },
//                 'source': null
//               }
//             },
//             'loc': {
//               'start': {
//                 'line': 3,
//                 'column': 9,
//                 'offset': 16
//               },
//               'end': {
//                 'line': 3,
//                 'column': 24,
//                 'offset': 31
//               },
//               'source': null
//             }
//           },
//           {
//             'type': 'Property',
//             'key': {
//               'type': 'Identifier',
//               'value': 'mods',
//               'raw': '"mods"',
//               'loc': {
//                 'start': {
//                   'line': 4,
//                   'column': 9,
//                   'offset': 41
//                 },
//                 'end': {
//                   'line': 4,
//                   'column': 15,
//                   'offset': 47
//                 },
//                 'source': null
//               }
//             },
//             'value': {
//               'type': 'Object',
//               'children': [
//                 {
//                   'type': 'Property',
//                   'key': {
//                     'type': 'Identifier',
//                     'value': 'type',
//                     'raw': '"type"',
//                     'loc': {
//                       'start': {
//                         'line': 4,
//                         'column': 19,
//                         'offset': 51
//                       },
//                       'end': {
//                         'line': 4,
//                         'column': 25,
//                         'offset': 57
//                       },
//                       'source': null
//                     }
//                   },
//                   'value': {
//                     'type': 'Literal',
//                     'value': 'h2',
//                     'raw': '"h2"',
//                     'loc': {
//                       'start': {
//                         'line': 4,
//                         'column': 27,
//                         'offset': 59
//                       },
//                       'end': {
//                         'line': 4,
//                         'column': 31,
//                         'offset': 63
//                       },
//                       'source': null
//                     }
//                   },
//                   'loc': {
//                     'start': {
//                       'line': 4,
//                       'column': 19,
//                       'offset': 51
//                     },
//                     'end': {
//                       'line': 4,
//                       'column': 31,
//                       'offset': 63
//                     },
//                     'source': null
//                   }
//                 }
//               ],
//               'loc': {
//                 'start': {
//                   'line': 4,
//                   'column': 17,
//                   'offset': 49
//                 },
//                 'end': {
//                   'line': 4,
//                   'column': 33,
//                   'offset': 65
//                 },
//                 'source': null
//               }
//             },
//             'loc': {
//               'start': {
//                 'line': 4,
//                 'column': 9,
//                 'offset': 41
//               },
//               'end': {
//                 'line': 4,
//                 'column': 33,
//                 'offset': 65
//               },
//               'source': null
//             }
//           }
//         ],
//         'loc': {
//           'start': {
//             'line': 2,
//             'column': 5,
//             'offset': 6
//           },
//           'end': {
//             'line': 5,
//             'column': 6,
//             'offset': 71
//           },
//           'source': null
//         }
//       },
//       {
//         'type': 'Object',
//         'children': [
//           {
//             'type': 'Property',
//             'key': {
//               'type': 'Identifier',
//               'value': 'block',
//               'raw': '"block"',
//               'loc': {
//                 'start': {
//                   'line': 7,
//                   'column': 9,
//                   'offset': 87
//                 },
//                 'end': {
//                   'line': 7,
//                   'column': 16,
//                   'offset': 94
//                 },
//                 'source': null
//               }
//             },
//             'value': {
//               'type': 'Literal',
//               'value': 'text',
//               'raw': '"text"',
//               'loc': {
//                 'start': {
//                   'line': 7,
//                   'column': 18,
//                   'offset': 96
//                 },
//                 'end': {
//                   'line': 7,
//                   'column': 24,
//                   'offset': 102
//                 },
//                 'source': null
//               }
//             },
//             'loc': {
//               'start': {
//                 'line': 7,
//                 'column': 9,
//                 'offset': 87
//               },
//               'end': {
//                 'line': 7,
//                 'column': 24,
//                 'offset': 102
//               },
//               'source': null
//             }
//           },
//           {
//             'type': 'Property',
//             'key': {
//               'type': 'Identifier',
//               'value': 'mods',
//               'raw': '"mods"',
//               'loc': {
//                 'start': {
//                   'line': 8,
//                   'column': 9,
//                   'offset': 112
//                 },
//                 'end': {
//                   'line': 8,
//                   'column': 15,
//                   'offset': 118
//                 },
//                 'source': null
//               }
//             },
//             'value': {
//               'type': 'Object',
//               'children': [
//                 {
//                   'type': 'Property',
//                   'key': {
//                     'type': 'Identifier',
//                     'value': 'type',
//                     'raw': '"type"',
//                     'loc': {
//                       'start': {
//                         'line': 8,
//                         'column': 19,
//                         'offset': 122
//                       },
//                       'end': {
//                         'line': 8,
//                         'column': 25,
//                         'offset': 128
//                       },
//                       'source': null
//                     }
//                   },
//                   'value': {
//                     'type': 'Literal',
//                     'value': 'h3',
//                     'raw': '"h3"',
//                     'loc': {
//                       'start': {
//                         'line': 8,
//                         'column': 27,
//                         'offset': 130
//                       },
//                       'end': {
//                         'line': 8,
//                         'column': 31,
//                         'offset': 134
//                       },
//                       'source': null
//                     }
//                   },
//                   'loc': {
//                     'start': {
//                       'line': 8,
//                       'column': 19,
//                       'offset': 122
//                     },
//                     'end': {
//                       'line': 8,
//                       'column': 31,
//                       'offset': 134
//                     },
//                     'source': null
//                   }
//                 }
//               ],
//               'loc': {
//                 'start': {
//                   'line': 8,
//                   'column': 17,
//                   'offset': 120
//                 },
//                 'end': {
//                   'line': 8,
//                   'column': 33,
//                   'offset': 136
//                 },
//                 'source': null
//               }
//             },
//             'loc': {
//               'start': {
//                 'line': 8,
//                 'column': 9,
//                 'offset': 112
//               },
//               'end': {
//                 'line': 8,
//                 'column': 33,
//                 'offset': 136
//               },
//               'source': null
//             }
//           }
//         ],
//         'loc': {
//           'start': {
//             'line': 6,
//             'column': 5,
//             'offset': 77
//           },
//           'end': {
//             'line': 9,
//             'column': 6,
//             'offset': 142
//           },
//           'source': null
//         }
//       }
//     ];

//     const result = checkPositionHeaders(texts, 'h2', 'h3', {});
//     expect(result).toBeInstanceOf(Array);
//     expect(result.length).toBe(0);
//   });
// });