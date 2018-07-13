const express = require('express');
const fs = require('fs');

const app = express();

// Routes
app.get('/mean', (req, res) => {
  if (!req.query.nums) res.status(400).send('Nums are required!');
  if (req.query.nums.some(num => isNaN(num)))
    res.status(400).send('Parameters must be numbers!');
  const result = calculate('mean', req.query.nums);
  const msg = `The mean of ${req.query.nums} is ${result}\n`;
  appendToResults(msg);
  return res.send(msg);
});
app.get('/median', (req, res) => {
  if (!req.query.nums) res.status(400).send('Nums are required!');
  if (req.query.nums.some(num => isNaN(num)))
    res.status(400).send('Parameters must be numbers!');
  const result = calculate('median', req.query.nums);
  const msg = `The median of ${req.query.nums} is ${result}\n`;
  appendToResults(msg);
  return res.send(msg);
});
app.get('/mode', (req, res) => {
  if (!req.query.nums) res.status(400).send('Nums are required!');
  if (req.query.nums.some(num => isNaN(num)))
    res.status(400).send('Parameters must be numbers!');
  const result = calculate('mode', req.query.nums);
  const msg = `The mode of ${req.query.nums} is ${result}\n`;
  appendToResults(msg);
  return res.send(msg);
});
app.get('/results', (req, res) => {
  fs.readFile('results.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send('There are no results yet!');
    }
    return res.send(data);
  });
});

// Start server
app.listen(3000, () => {
  console.log('server started');
});

// Helper functions
function calculate(operation, numbersString) {
  const numbers = numbersString.split(',').map(num => +num);

  if (operation === 'mean') {
    const sum = numbers.reduce((acc, num) => acc + num);
    const count = numbers.length;
    return sum / count;
  } else if (operation === 'median') {
    const sortedNums = numbers.sort((a, b) => a > b);
    return sortedNums[Math.floor(numbers.length / 2)];
  } else if (operation === 'mode') {
    let count = {};
    numbers.forEach(num => {
      count[num] = count[num] + 1 || 1;
    });
    let mostFrequentCount = 1;
    let mode = numbers[0];
    for (let num in count) {
      if (count[num] > mostFrequentCount) {
        mostFrequentCount = count[num];
        mode = num;
      }
    }
    return mode;
  }
}

function appendToResults(data) {
  fs.appendFile('results.txt', data, 'utf8', err => {
    if (err) console.error(err);
  });
}
