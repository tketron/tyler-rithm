const FAVORITE_NUMBER = 24;
const REQUEST_URL = `http://numbersapi.com/${FAVORITE_NUMBER}?json`;

$(function() {
  //query numbers API
  $.when(
    $.ajax(REQUEST_URL),
    $.ajax(REQUEST_URL),
    $.ajax(REQUEST_URL),
    $.ajax(REQUEST_URL)
  )
    .done((...facts) => {
      facts.forEach(fact => {
        $('#facts').append(`<p>${fact[0].text}</p>`);
      });
    })
    .catch(err => console.log(err));
});
