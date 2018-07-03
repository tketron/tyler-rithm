const fs = require('fs');

fs.readFile('./test.txt', 'utf8', (err, data) => {
  if (err) console.error(err);

  for (let i = 1; i <= 5; i++) {
    console.log(`Writing copy ${i}...`);
    fs.writeFile(`./copy${i}.txt`, data, 'utf8', err => {
      if (err) console.error(err);
      console.log(`Finished writing copy ${i}`);
    });
  }
});
