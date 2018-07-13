/**
 * This function sorts the keys in an object,
 *  or if it's an array of objects it sorts every object in the array.
 *  It also sorts nested arrays of objects.
 * @param {Array|Object} obj - an array or an object
 */
function recursiveSort(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => recursiveSort(v));
  }
  return Object.keys(obj)
    .sort()
    .reduce((prev, cur) => {
      prev[cur] = obj[cur];
      if (Array.isArray(prev[cur])) {
        prev[cur] = prev[cur].map(v => {
          if (typeof v === 'object') {
            return recursiveSort(v);
          }
          return v;
        });
      }
      return prev;
    }, {});
}

module.exports = recursiveSort;

// console.log(recursiveSort({ c: 'last', b: 'second', a: 'first' }));
// console.log(recursiveSort({}));
// console.log(recursiveSort([{ secondObj: 'second', firstKey: 'first' }, { firstObj: 'first', middleKey: 'middle', z: 'last' }]));
// console.log(recursiveSort({ a: '1', 4: '2' }));
