import bot from "bot";

export default (msg: any, match: any) => {
    console.log(msg, match);

    const chatId = msg.chat.id;
    const fromChatId = msg.from.id;
    const messageId = msg.message_id;
    
    bot.forwardMessage(chatId, fromChatId, messageId)
};
