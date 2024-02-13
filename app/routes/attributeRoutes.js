const attributesModel = require('../models/attributesModel');
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  const attributes = await attributesModel.loadAttributesData();
  res.json(attributes);
});

router.post('/create', async (req, res) => {
  const attributes = await attributesModel.loadAttributesData();

  const newId = attributes.length + 1;
  const newAttributes = {
    ChemID: newId,
    ...req.body
  };

  attributes.push(newAttributes);

  await attributesModel.saveAttributesData(attributes);

  res.json(newAttributes);
});

router.get('/:id', async (req, res) => {
  const attributeId = parseInt(req.params.id);
  const attributes = await attributesModel.loadAttributesData();

  const attribute = attributes.find((u) => u.ChemID === attributeId);

  if (attribute) {
    res.json(attribute);
  } else {
    res.status(404).json({ error: 'Attributes not found' });
  }
});

router.post('/update', async (req, res) => {
  const attributeIdToUpdate = parseInt(req.body.ChemID);
  const attributes = await attributesModel.loadAttributesData();
  const attributeIndex = attributes.findIndex((attribute) => attribute.ChemID === attributeIdToUpdate);
  if (attributeIndex !== -1) {
    attributes[attributeIndex] = {
      ...attributes[attributeIndex],
      ...req.body,
    ChemID: parseInt(req.body.ChemID) 
    };

    await attributesModel.saveAttributesData(attributes);

    res.json(attributes[attributeIndex]);
  } else {
    res.status(404).json({ error: 'Attributes not found' });
  }
});

module.exports = router;
