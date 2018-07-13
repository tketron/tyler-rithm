// Initiailize connection to database

const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://localhost/teams_db'
});

client.connect();

module.exports = client;
