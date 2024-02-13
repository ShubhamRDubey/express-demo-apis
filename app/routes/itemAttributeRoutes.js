const itemAttributesModel = require('../models/itemAttributeModel');
const attributesModel = require('../models/attributesModel');
const itemModel = require('../models/itemModels');
const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get("/:id", async (req, res) => {
  var itemId = parseInt(req.params.id);
  const itemAttributes = await itemAttributesModel.loadItemAttributesData();
  const attributes = await attributesModel.loadAttributesData();
  const items_list = await itemModel.loadItemsData();
  const filteredItems = itemAttributes.filter(item => item.ItemID === itemId);
  const extractedItems = filteredItems.map(item => {
    const taskdeskItem = attributes.find(attribute => attribute.TaskDescID === item.TaskDescID);
    const taskdesc = taskdeskItem ? taskdeskItem.TaskDesc : null;

    return {
      ItemValue: item.ItemValue,
      ItemValue1: item.ItemValue1,
      TaskDescID: item.TaskDescID,
      TaskDesc: taskdesc
    };
  });
  const itemData = items_list.find(main_item => main_item.id === itemId);
  res.json({
    id: itemData.id,
    name: itemData.name,
    details:extractedItems
    }
  );
}
);

module.exports = router;

