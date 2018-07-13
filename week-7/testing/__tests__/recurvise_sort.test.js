const recursiveSort = require('../recursive_sort');

test('works with basic object', () => {
  const result = recursiveSort({ c: 'third', b: 'second', a: 'first' });
  expect(result).toEqual({ a: 'first', b: 'second', c: 'third' });
});

test('works with arrays', () => {
  const result = recursiveSort([
    { secondObj: 'second', firstKey: 'first' },
    { firstObj: 'first', middleKey: 'middle', z: 'last' }
  ]);
  expect(result).toEqual([
    { firstKey: 'first', secondObj: 'second' },
    { z: 'last', middleKey: 'middle', firstObj: 'first' }
  ]);
});

test('works with nested arrays', () => {
  const result = recursiveSort([
    [{ 2: 'second', 1: 'first' }],
    { b: true, a: 45 }
  ]);
  expect(result).toEqual([[{ 1: 'first', 2: 'second' }], { a: 45, b: true }]);
});

test('works with nested objects', () => {
  const result = recursiveSort({ c: { b: 2, a: 1 }, 5: false });
  expect(result).toEqual({ 5: false, c: { a: 1, b: 2 } });
});
