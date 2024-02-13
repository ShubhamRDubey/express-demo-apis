const attributesFile = "./data/attributes.json";
const fs = require('fs').promises;

const loadAttributesData = async () => {
  try {
    const rawData = await fs.readFile(attributesFile);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading attribute data:', error.message);
    return [];
  }
};

const saveAttributesData = async (attributes) => {
  try {
    await fs.writeFile(attributesFile, JSON.stringify(attributes, null, 2));
  } catch (error) {
    console.error('Error saving attributes data:', error.message);
  }
};

module.exports = {
  loadAttributesData,
  saveAttributesData
}
