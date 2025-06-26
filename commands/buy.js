const { loadDb, saveDb, ensureUser } = require('../utils/db');
const { loadLinks } = require('../utils/links');
const { mainKeyboard } = require('../keyboards');

function handlePurchase(ctx, index, cost) {
    const db = loadDb();
    const userId = ctx.from.id.toString();
    ensureUser(db, userId);

    const user = db.users[userId];
    const links = loadLinks();
    const link = links[index];

    if (!link) return ctx.reply('⚠️ Ссылка не найдена.', mainKeyboard);
    if (user.usedLinks.includes(link)) return ctx.reply('⚠️ Уже куплено.', mainKeyboard);
    if (user.balance < cost) return ctx.reply('💸 Недостаточно средств.', mainKeyboard);

    user.balance -= cost;
    user.usedLinks.push(link);
    saveDb(db);

    ctx.reply(`✅ Ссылка: ${link}`, mainKeyboard);
}

module.exports = (bot) => {
    bot.hears('📥 Купить доступ', (ctx) => {
        const buttons = [
            ['150 архивов — 500 ₽'],
            ['450 архивов — 1200 ₽'],
            ['1000 архивов — 2300 ₽'],
            ['все каналы — 3500 ₽'],
            ['⬅️ Назад']
        ];
        ctx.reply('Выберите доступ:', {
            reply_markup: { keyboard: buttons, resize_keyboard: true }
        });
    });

    bot.hears('150 архивов — 500 ₽', (ctx) => handlePurchase(ctx, 0, 500));
    bot.hears('450 архивов — 1200 ₽', (ctx) => handlePurchase(ctx, 1, 1200));
    bot.hears('1000 архивов — 2300 ₽', (ctx) => handlePurchase(ctx, 2, 2300));
    bot.hears('все каналы — 3500 ₽', (ctx) => handlePurchase(ctx, 3, 3500));

    bot.hears('⬅️ Назад', (ctx) => {
        ctx.reply('Главное меню:', mainKeyboard);
    });
};