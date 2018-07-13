const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://localhost/express-bcrypt-db'
});

client.connect();

module.exports = client;
