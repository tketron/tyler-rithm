const FAV_NUMBER = 7;
const BASE_URL = 'http://numbersapi.com';

// 1.
async function part1() {
  let data = await $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`);
  console.log(data);
}
part1();

// 2.
const FAV_NUMBERS = [7, 11, 22];
async function part2() {
  let data = await $.getJSON(`${BASE_URL}/${FAV_NUMBERS}?json`);
  console.log(data);
}
part2();

// 3.
async function part3() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`))
  );
  facts.forEach(fact => {
    $('body').append(`<p>${fact.text}</p>`);
  });
}
part3();
