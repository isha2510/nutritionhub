const express = require('express')
const router = express.Router();
const recipes = require('../../utils/recipeMock.json');

router.get('/', (req, res) => {
  res.send(recipes);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

});

module.exports = router;