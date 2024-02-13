const itemAttributeFile = "./data/item_attributes.json";
const fs = require('fs').promises;

const loadItemAttributesData = async () => {
  try {
    const rawData = await fs.readFile(itemAttributeFile);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading attribute data:', error.message);
    return [];
  }
};

const saveItemAttributesData = async (attributes) => {
  try {
    await fs.writeFile(itemAttributeFile, JSON.stringify(attributes, null, 2));
  } catch (error) {
    console.error('Error saving attributes data:', error.message);
  }
};

module.exports = {
  loadItemAttributesData,
  saveItemAttributesData
}
