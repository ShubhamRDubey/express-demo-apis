const dinFile = "./data/din_types.json";
const dinSingleFile = "./data/din_single_types.json";
const fs = require('fs').promises;

const loadDinsData = async () => {
  try {
    const rawData = await fs.readFile(dinFile);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading din data:', error.message);
    return [];
  }
};

const loadSingleDinData = async () => {
  try {
    const rawData = await fs.readFile(dinSingleFile);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading din data:', error.message);
    return [];
  }
};

module.exports = {
  loadDinsData,
  loadSingleDinData
}
