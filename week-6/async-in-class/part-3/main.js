$(function() {
  $('#get-pokemon').click(async function() {
    const pokeData = await getPokeData();
    pokeData.forEach(data => {
      console.log(data);
      constructAndAppendCard(data);
    });
  });
});

function constructAndAppendCard(data) {
  const flavorText = data.species.flavor_text_entries.filter(el => {
    return el.language.name === 'en';
  });
  $('#pokemon').append(`<div class="poke-card">
  <img src="${data.pokemon.sprites.front_default}">
  <h3 class="name">${data.pokemon.name.toUpperCase()}</h3>
  <p class="flavor-text">${flavorText[0].flavor_text}</p>
  </div>`);
}

async function getPokeData() {
  const { results } = await $.get(
    'https://pokeapi.co/api/v2/pokemon?limit=949'
  );
  const p1URL = results[getRandomNumber()].url;
  const p2URL = results[getRandomNumber()].url;
  const p3URL = results[getRandomNumber()].url;

  const p1 = await $.get(p1URL);
  const p2 = await $.get(p2URL);
  const p3 = await $.get(p3URL);
  const s1 = await $.get(p1.species.url);
  const s2 = await $.get(p2.species.url);
  const s3 = await $.get(p3.species.url);
  return [
    { pokemon: p1, species: s1 },
    { pokemon: p2, species: s2 },
    { pokemon: p3, species: s3 }
  ];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 949);
}
