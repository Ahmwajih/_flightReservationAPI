const morgan = require('morgan');
const fs = require('node:fs');
const path = require('node:path');

const now = new Date();
const today = now.toISOString().split('T')[0];
const logDirectory = path.join(__dirname, '../logs');

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

module.exports = morgan('combined', {
    stream: fs.createWriteStream(path.join(logDirectory, `${today}.log`), { flags: 'a+' })
});