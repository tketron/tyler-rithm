$(function() {
  getDeck()
    .then(id => {
      $('#get-card').click(function() {
        //call api to get a card
        console.log('clicked', id);
        getCardFromDeck(id).then(data => {
          if (data) {
            $('#deck').append(
              `<div class="card">
              <img src="${data.cards[0].image}"
              <p>${data.cards[0].value} of ${data.cards[0].suit}</p>
              </div>`
            );
          }
        });
      });
    })
    .catch(err => console.log(err));
});

function getDeck() {
  return new Promise((resolve, reject) => {
    $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => {
        return resolve(res.deck_id);
      })
      .catch(err => reject(err));
  });
}

function getCardFromDeck(deckID) {
  return new Promise((resolve, reject) => {
    $.getJSON(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
      .done(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
}
