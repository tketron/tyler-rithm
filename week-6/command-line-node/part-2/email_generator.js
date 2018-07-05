const fs = require('fs');

main();

function main() {
  readData()
    .then(data => {
      // console.log(data);
      processData(data);
    })
    .catch(err => {
      console.error(err);
    });
}

//read in data
async function readData() {
  return new Promise(resolve => {
    fs.readFile('data.json', (err, data) => {
      if (err) console.error(err);
      // console.log(JSON.parse(data));
      resolve(JSON.parse(data));
    });
  });
}

//filter out data
function processData(data) {
  const cities = new Set(['San Francisco', 'Seattle', 'Portland']);
  const potentialStates = new Set(['California', 'Washington', 'Oregon']);
  data.forEach(contact => {
    if (cities.has(contact.city)) {
      generateEmail(contact);
    } else if (potentialStates.has(contact.state)) {
      addContactToPotentials(contact);
    }
  });
}

function generateEmail(contact) {
  const email = getEmailText(contact);
  fs.writeFile(`./emails/${contact.email}.txt`, email, 'utf8', err => {
    if (err) console.error(err);
  });
}

function addContactToPotentials(contact) {
  fs.appendFile(
    'potentials.txt',
    `${contact.firstName} ${contact.lastName}, ${contact.email}, ${
      contact.company
    }
    `,
    'utf8',
    err => {
      console.error(err);
    }
  );
}

function getEmailText(contact) {
  return `Hello, ${contact.firstName}!
  
I saw your experience at ${
    contact.company
  } and thought you would be a great fit for us here at LinkedList.  Let me know if you're interested in getting coffee of whatever recruiters say...
          
Best,
          
Terrible Tyler
LinkedList`;
}
