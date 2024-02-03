const threadFile = "./data/thread_size_types.json";
const fs = require('fs').promises;

const loadThreadsData = async () => {
  try {
    const rawData = await fs.readFile(threadFile);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading thread data:', error.message);
    return [];
  }
};

const saveThreadsData = async (threads) => {
  try {
    await fs.writeFile(threadFile, JSON.stringify(threads, null, 2));
  } catch (error) {
    console.error('Error saving threads data:', error.message);
  }
};

module.exports = {
  loadThreadsData,
  saveThreadsData
}
