import TelegramBot from "node-telegram-bot-api";

// Fetch token from environment variable
let token: string = process.env.BOT_TOKEN || "";

// Initiate telegram bot
const bot: TelegramBot = new TelegramBot(token, {
    polling: true,
});

export default bot;
