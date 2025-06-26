const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/database.json');

function loadDb() {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function saveDb(db) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function ensureUser(db, userId) {
    if (!db.users[userId]) {
        db.users[userId] = {
            balance: 0,
            usedLinks: []
        };
    }
}

module.exports = { loadDb, saveDb, ensureUser };