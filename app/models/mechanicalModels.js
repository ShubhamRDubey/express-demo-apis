const mechanicalFile = "./data/mechanical_types.json";
const fs = require('fs').promises;

const loadMechanicalsData = async () => {
  try {
    const rawData = await fs.readFile(mechanicalFile);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading mechanical data:', error.message);
    return [];
  }
};

const saveMechanicalsData = async (mechanicals) => {
  try {
    await fs.writeFile(mechanicalFile, JSON.stringify(mechanicals, null, 2));
  } catch (error) {
    console.error('Error saving mechanicals data:', error.message);
  }
};

module.exports = {
  loadMechanicalsData,
  saveMechanicalsData
}
