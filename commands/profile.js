const { loadDb, ensureUser } = require('../utils/db');
const { mainKeyboard } = require('../keyboards');

module.exports = (bot) => {
    bot.hears('👤 Личный кабинет', (ctx) => {
        const db = loadDb();
        const userId = ctx.from.id.toString();
        ensureUser(db, userId);
        const user = db.users[userId];

        ctx.reply(`👤 Ваш профиль:\nБаланс: ${user.balance} руб.`, mainKeyboard);
    });
};