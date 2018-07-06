const express = require('express');
const router = express.Router();

let items = [
  { id: 1, name: 'banana', price: 0.29 },
  { id: 2, name: 'milk', price: 3 },
  { id: 3, name: 'chicken', price: 4.99 }
];
let currentID = 4;

router.get('/', (req, res) => {
  return res.json(items);
});

router.post('/', (req, res) => {
  items.push({
    id: currentID,
    name: req.body.name,
    price: req.body.price
  });
  currentID += 1;
  return res.json(items);
});

router.get('/:id', (req, res) => {
  for (let item of items) {
    if (item.id === +req.params.id) {
      return res.json(item);
    }
  }
  return res.status(404).send('Item not found!');
});

router.patch('/:id', (req, res) => {
  for (let item of items) {
    if (item.id === +req.params.id) {
      item.name = req.body.name || item.name;
      item.price = req.body.price || item.price;
      return res.json(items);
    }
  }
  return res.status(404).send('Item not found!');
});

router.delete('/:id', (req, res) => {
  for (let item of items) {
    if (item.id === +req.params.id) {
      items.splice(items.indexOf(item), 1);
      return res.json(items);
    }
  }
  return res.status(404).send('Item not found!');
});

module.exports = router;
