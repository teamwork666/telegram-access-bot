const axios = require('axios');
const { loadDb, ensureUser } = require('../utils/db');
const { mainKeyboard } = require('../keyboards');

module.exports = (bot) => {
    bot.hears('💰 Пополнить баланс', async (ctx) => {
        const userId = ctx.from.id.toString();
        const idempotenceKey = `${userId}-${Date.now()}`;
        const topUpAmount = 500;

        try {
            const res = await axios.post(
                'https://api.yookassa.ru/v3/payments',
                {
                    amount: { value: `${topUpAmount}.00`, currency: 'RUB' },
                    confirmation: {
                        type: 'redirect',
                        return_url: `${process.env.DOMAIN}/success?user_id=${userId}`
                    },
                    capture: true,
                    metadata: { user_id: userId, amount: topUpAmount },
                    description: `Пополнение баланса для ${ctx.from.username || userId}`
                },
                {
                    auth: {
                        username: process.env.YOOMONEY_SHOP_ID,
                        password: process.env.YOOMONEY_API_KEY
                    },
                    headers: { 'Idempotence-Key': idempotenceKey }
                }
            );

            ctx.reply(`💳 Оплатите по ссылке:\n${res.data.confirmation.confirmation_url}`, mainKeyboard);
        } catch (err) {
            console.error(err);
            ctx.reply('❌ Ошибка при создании платежа.', mainKeyboard);
        }
    });
};