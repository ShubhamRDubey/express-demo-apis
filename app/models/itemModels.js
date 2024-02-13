const itemFile = "./data/item_types.json";
const fs = require('fs').promises;

const loadItemsData = async () => {
  try {
    const rawData = await fs.readFile(itemFile);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading item data:', error.message);
    return [];
  }
};

const saveItemsData = async (items) => {
  try {
    await fs.writeFile(itemFile, JSON.stringify(items, null, 2));
  } catch (error) {
    console.error('Error saving items data:', error.message);
  }
};

module.exports = {
  loadItemsData,
  saveItemsData
}
