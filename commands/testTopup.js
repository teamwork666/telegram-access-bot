const { loadDb, saveDb, ensureUser } = require('../utils/db');
const { mainKeyboard } = require('../keyboards');

module.exports = (bot) => {
    bot.hears('Тестовое пополнение', (ctx) => {
        const db = loadDb();
        const userId = ctx.from.id.toString();
        ensureUser(db, userId);
        db.users[userId].balance += 1000;
        saveDb(db);

        ctx.reply('✅ Баланс пополнен на 1000 ₽', mainKeyboard);
    });
};