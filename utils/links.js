const fs = require('fs');
const path = require('path');
const linksPath = path.join(__dirname, '../data/links.json');

function loadLinks() {
    return JSON.parse(fs.readFileSync(linksPath, 'utf8'));
}

function saveLinks(links) {
    fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
}

module.exports = { loadLinks, saveLinks };