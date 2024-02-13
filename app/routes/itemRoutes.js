const itemModel = require('../models/itemModels');
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  const items = await itemModel.loadItemsData();
  res.json(items);
});

router.post('/create', async (req, res) => {
  const items = await itemModel.loadItemsData();

  const newId = items.length + 1;
  const newItem = {
    id: newId,
    ...req.body
  };

  items.push(newItem);

  await itemModel.saveItemsData(items);

  res.json(newItem);
});

router.get('/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);
  const items = await itemModel.loadItemsData();

  const item = items.find((u) => u.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item Size not found' });
  }
});

router.get('/size/:id', async (req, res) => {
  const sizeId = parseInt(req.params.id);
  const items = await itemModel.loadItemsData();

  const item = items.filter((u) => u.size_id === sizeId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item Size not found' });
  }
});

router.post('/update', async (req, res) => {
  const itemIdToUpdate = parseInt(req.body.ID);
  const items = await itemModel.loadItemsData();
  const itemIndex = items.findIndex((item) => item.ID === itemIdToUpdate);
  if (itemIndex !== -1) {
    items[itemIndex] = {
      ...items[itemIndex],
      ...req.body,
    ID: parseInt(req.body.ID) 
    };

    await itemModel.saveItemsData(items);

    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});


module.exports = router;
