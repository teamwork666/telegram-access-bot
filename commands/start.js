const { mainKeyboard } = require('../keyboards');

module.exports = (bot) => {
    bot.start((ctx) => {
        const name = ctx.from.first_name || 'пользователь';
        ctx.reply(`Привет, ${name}! Добро пожаловать в бот-доступ. Выберите действие:`, mainKeyboard);
    });
};