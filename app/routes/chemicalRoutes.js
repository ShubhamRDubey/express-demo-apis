const chemicalModel = require('../models/chemicalModels');
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  const chemicals = await chemicalModel.loadChemicalsData();
  res.json(chemicals);
});

router.post('/create', async (req, res) => {
  const chemicals = await chemicalModel.loadChemicalsData();

  const newId = chemicals.length + 1;
  const newChemical = {
    ChemID: newId,
    ...req.body
  };

  chemicals.push(newChemical);

  await chemicalModel.saveChemicalsData(chemicals);

  res.json(newChemical);
});

router.get('/:id', async (req, res) => {
  const chemicalId = parseInt(req.params.id);
  const chemicals = await chemicalModel.loadChemicalsData();

  const chemical = chemicals.find((u) => u.ChemID === chemicalId);

  if (chemical) {
    res.json(chemical);
  } else {
    res.status(404).json({ error: 'Chemical not found' });
  }
});

router.post('/update', async (req, res) => {
  const chemicalIdToUpdate = parseInt(req.body.ChemID);
  const chemicals = await chemicalModel.loadChemicalsData();
  const chemicalIndex = chemicals.findIndex((chemical) => chemical.ChemID === chemicalIdToUpdate);
  if (chemicalIndex !== -1) {
    chemicals[chemicalIndex] = {
      ...chemicals[chemicalIndex],
      ...req.body,
    ChemID: parseInt(req.body.ChemID) 
    };

    await chemicalModel.saveChemicalsData(chemicals);

    res.json(chemicals[chemicalIndex]);
  } else {
    res.status(404).json({ error: 'Chemical not found' });
  }
});


module.exports = router;
