const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Initialize data file if it doesn't exist
const initDataFile = async () => {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
};

const connectDB = async () => {
  await initDataFile();
  console.log('JSON Database Connected');
};

const getUsers = async () => {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
};

const saveUsers = async (users) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
};

module.exports = { connectDB, getUsers, saveUsers };
