const axios = require('axios');

const endpoint = process.argv[2];

axios
  .get(endpoint)
  .then(response => {
    console.log(response.data);
  })
  .catch(err => console.log(err));
