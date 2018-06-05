const KEY = 'HEg4D4yn5yL1hDohN0wlZ9FnVpwrWnm5';
const GIPHY_SEARCH_URL = 'http://api.giphy.com/v1/gifs/random';

$(function() {
  $('#submitForm').on('submit', function(event) {
    event.preventDefault();
    addNewGif();
  });
  $('#clearBtn').on('click', clearGIFs);
});

function addNewGif() {
  const searchString = $('#searchText').val();
  getGIF(searchString);
  $('#searchText').val('');
}

function clearGIFs() {
  $('#gif-container').empty();
}

function getGIF(string) {
  let address = `${GIPHY_SEARCH_URL}?tag=${string}&api_key=${KEY}`;
  $.get(address, function(data) {
    let gifImage = data.data.image_url;
    $('#gif-container').prepend(`<div><img src='${gifImage}'></div>`);
  });
}
