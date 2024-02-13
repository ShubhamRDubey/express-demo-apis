const dinModel = require('../models/dinModels');
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  const dins = await dinModel.loadDinsData();
  res.json(dins);
});

router.get("/:id", async (req, res) => {
  var dinId = parseInt(req.params.id);
  const dins = await dinModel.loadSingleDinData();
  console.log(dinId);
  const din = dins.filter((din) => din.id === dinId).pop();
  console.log(din);
  if (!!din) {
    res.json(din);
  } else {
    res.status(404).json({ error: "din not found" });
  }
});

module.exports = router;
