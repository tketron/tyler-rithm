import fruits from './foods';
import { choice, remove } from './arrayHelpers';

const randomFruit = choice(fruits);
console.log(`I'd like one ${randomFruit}, please.`);
console.log(`Here you go: ${randomFruit}`);
console.log('Delicious!  May I have another?');
const removedFruit = remove(fruits, randomFruit);
console.log(
  `Sorry, we're all out of ${removedFruit}!  We have ${
    fruits.length
  } fruits remaining.`
);
