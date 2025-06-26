require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

require('./commands/start')(bot);
require('./commands/profile')(bot);
require('./commands/topup')(bot);
require('./commands/buy')(bot);
require('./commands/testTopup')(bot); // удалить в проде

bot.launch();
console.log('🤖 Бот запущен');