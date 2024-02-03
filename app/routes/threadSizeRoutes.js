const threadModel = require('../models/threadSizeModels');
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  const threads = await threadModel.loadThreadsData();
  res.json(threads);
});

router.post('/create', async (req, res) => {
  const threads = await threadModel.loadThreadsData();

  const newId = threads.length + 1;
  const newThread = {
    ID: newId,
    ...req.body
  };

  threads.push(newThread);

  await threadModel.saveThreadsData(threads);

  res.json(newThread);
});

router.get('/:id', async (req, res) => {
  const threadId = parseInt(req.params.id);
  const threads = await threadModel.loadThreadsData();

  const thread = threads.find((u) => u.ID === threadId);

  if (thread) {
    res.json(thread);
  } else {
    res.status(404).json({ error: 'Thread Size not found' });
  }
});

router.post('/update', async (req, res) => {
  const threadIdToUpdate = parseInt(req.body.ID);
  const threads = await threadModel.loadThreadsData();
  const threadIndex = threads.findIndex((thread) => thread.ID === threadIdToUpdate);
  if (threadIndex !== -1) {
    threads[threadIndex] = {
      ...threads[threadIndex],
      ...req.body,
    ID: parseInt(req.body.ID) 
    };

    await threadModel.saveThreadsData(threads);

    res.json(threads[threadIndex]);
  } else {
    res.status(404).json({ error: 'Thread not found' });
  }
});


module.exports = router;
