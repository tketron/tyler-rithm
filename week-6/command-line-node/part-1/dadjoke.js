const axios = require('axios');
const fs = require('fs');

const term = process.argv[2];

axios
  .get(`https://icanhazdadjoke.com/search?term=${term}`, {
    headers: { Accept: 'application/json' }
  })
  .then(response => {
    processData(response.data);
  })
  .catch(e => console.error(e));

function processData(data) {
  // console.log(data.results);
  if (data.results.length > 0) {
    //print random to command
    const randomJoke =
      data.results[Math.floor(Math.random() * data.results.length)];
    console.log(randomJoke.joke);

    //save joke to file
    fs.writeFile('jokes.txt', randomJoke.joke, 'utf8', err => {
      if (err) console.error(err);
    });
  } else {
    console.log(`No jokes were found matching ${term}! :(`);
  }
}
