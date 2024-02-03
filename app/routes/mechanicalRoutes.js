const mechanicalModel = require('../models/mechanicalModels');
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  const mechanicals = await mechanicalModel.loadMechanicalsData();
  res.json(mechanicals);
});

router.post('/create', async (req, res) => {
  const mechanicals = await mechanicalModel.loadMechanicalsData();

  const newId = mechanicals.length + 1;
  const newMechanical = {
    ChemID: newId,
    ...req.body
  };

  mechanicals.push(newMechanical);

  await mechanicalModel.saveMechanicalsData(mechanicals);

  res.json(newMechanical);
});

router.get('/:id', async (req, res) => {
  const mechanicalId = parseInt(req.params.id);
  const mechanicals = await mechanicalModel.loadMechanicalsData();

  const mechanical = mechanicals.find((u) => u.ChemID === mechanicalId);

  if (mechanical) {
    res.json(mechanical);
  } else {
    res.status(404).json({ error: 'Mechanical not found' });
  }
});

router.post('/update', async (req, res) => {
  const mechanicalIdToUpdate = parseInt(req.body.ChemID);
  const mechanicals = await mechanicalModel.loadMechanicalsData();
  const mechanicalIndex = mechanicals.findIndex((mechanical) => mechanical.ChemID === mechanicalIdToUpdate);
  if (mechanicalIndex !== -1) {
    mechanicals[mechanicalIndex] = {
      ...mechanicals[mechanicalIndex],
      ...req.body,
    ChemID: parseInt(req.body.ChemID) 
    };

    await mechanicalModel.saveMechanicalsData(mechanicals);

    res.json(mechanicals[mechanicalIndex]);
  } else {
    res.status(404).json({ error: 'Mechanical not found' });
  }
});


module.exports = router;
