function choice(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

function remove(arr, item) {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === item) {
      //remove from array
      const deletedItem = arr.splice(i, 1);

      //return
      return deletedItem;
    }
    i++;
  }
  return undefined;
}

export { choice, remove };
