const FAV_NUMBER = 7;
const BASE_URL = 'http://numbersapi.com';

// 1.
$.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`, function(data) {
  console.log(data);
});

// 2.
const FAV_NUMBERS = [7, 11, 22];
$.getJSON(`${BASE_URL}/${FAV_NUMBERS}?json`, function(data) {
  console.log(data);
});

// 3.
$.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`, function(data) {
  $('body').append(`<p>${data.text}</p>`);
  $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`, function(data) {
    $('body').append(`<p>${data.text}</p>`);
    $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`, function(data) {
      $('body').append(`<p>${data.text}</p>`);
      $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`, function(data) {
        $('body').append(`<p>${data.text}</p>`);
      });
    });
  });
});
