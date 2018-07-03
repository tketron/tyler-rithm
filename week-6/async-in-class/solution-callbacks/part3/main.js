$(function() {
  const BASE_URL = 'https://pokeapi.co/api/v2';

  // 1.
  $.getJSON(`${BASE_URL}/pokemon/?limit=1000`, function(data) {
    console.log(data);
  });

  // 2.
  $.getJSON(`${BASE_URL}/pokemon/?limit=1000`, function(data) {
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * data.results.length);
      let url = data.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }
    randomPokemonUrls.forEach(function(url, i) {
      $.getJSON(url, function(data) {
        console.log(data);
      });
    });
  });

  // 3.
  let $btn = $('button');
  let $pokeArea = $('#pokemon-area');

  $btn.on('click', function() {
    $pokeArea.empty();
    $.getJSON(`${BASE_URL}/pokemon/?limit=1000`, function(data) {
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      randomPokemonUrls.forEach(function(url, i) {
        $.getJSON(url, function(data) {
          let name = data.name;
          let imgSrc = data.sprites.front_default;
          $.getJSON(data.species.url, function(data) {
            let descriptionObj = data.flavor_text_entries.find(function(entry) {
              return entry.language.name === 'en';
            });
            let description = descriptionObj ? descriptionObj.flavor_text : '';
            $pokeArea.append(makePokeCard(name, imgSrc, description));
          });
        });
      });
    });
  });

  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
  }
});
