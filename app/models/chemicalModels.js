const chemicalFile = "./data/chemical_types.json";
const fs = require('fs').promises;

const loadChemicalsData = async () => {
  try {
    const rawData = await fs.readFile(chemicalFile);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading chemical data:', error.message);
    return [];
  }
};

const saveChemicalsData = async (chemicals) => {
  try {
    await fs.writeFile(chemicalFile, JSON.stringify(chemicals, null, 2));
  } catch (error) {
    console.error('Error saving chemicals data:', error.message);
  }
};

module.exports = {
  loadChemicalsData,
  saveChemicalsData
}
