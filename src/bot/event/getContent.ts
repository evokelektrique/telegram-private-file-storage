import { Message } from "node-telegram-bot-api";
import { appDataSource } from "../../data_source";
import { Message as MessageEntity } from "../../entity/Message";
import bot from "../bot";
import logger from "../../logger";
import { generateLink } from "../uitls";

/**
 * Retrieves content based on a regular expression match in a Telegram bot message.
 * @param msg - The Telegram Message object representing the incoming message.
 * @param match - The regular expression match obtained from the incoming message.
 */
const getContent = async (msg: Message, match: RegExpExecArray) => {
    const chatId = msg.chat.id;

    if (!match) {
        // If no valid match is found, send a "Nothing matched" message to the current chat
        bot.sendMessage(chatId, "Nothing matched");
        return;
    }

    // Retrieving a message entity from the data source based on a UUID
    const message = await appDataSource.manager.findOneBy(MessageEntity, {
        uuid: match[1],
    });

    if (message) {
        // If a matching message entity is found, copy the message content to the current chat
        bot.copyMessage(chatId, message.fromChatId, message.messageId);
        
        const generatedLink = generateLink(message.uuid);
        logger.info("A temp link opened " + generatedLink);
    } else {
        // If no matching message entity is found, send a "Not found" message to the current chat
        bot.sendMessage(chatId, "Not found");
    }
};

export default getContent;
