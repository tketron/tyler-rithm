const FAV_NUMBER = 7;
const BASE_URL = 'http://numbersapi.com';

// 1.
$.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`).then(data => {
  console.log(data);
});

// 2.
const FAV_NUMBERS = [7, 11, 22];
$.getJSON(`${BASE_URL}/${FAV_NUMBERS}?json`).then(data => {
  console.log(data);
});

// 3.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`);
  })
).then(facts => {
  facts.forEach(fact => $('body').append(`<p>${fact.text}</p>`));
});
