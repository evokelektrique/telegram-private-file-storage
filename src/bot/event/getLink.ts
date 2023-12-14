import { appDataSource } from "../../data_source";
import { Message as MessageEntity } from "../../entity/Message";
import logger from "../../logger";
import bot from "../bot";
import { Message } from "node-telegram-bot-api";
import crypto from "node:crypto";
import { generateLink } from "../uitls";

/**
 * Generate a link for each forwarded message and send a copy of the message with the generated temporary link.
 * @param msg - Any kind of message
 */
const getLink = async (msg: Message) => {
    const chatId = msg.chat.id;
    const fromChatId = msg.from?.id;
    const messageId = msg.message_id;

    // Ignore messages with entities (e.g., links, mentions)
    if (msg.entities) {
        return;
    }

    if (fromChatId) {
        const uuid = crypto.randomUUID();

        // Insert the message into the database
        await appDataSource
            .createQueryBuilder()
            .insert()
            .into(MessageEntity)
            .values({
                messageId: messageId,
                fromChatId: fromChatId,
                uuid: uuid,
            })
            .execute();

        // Generate and send a temporary link to the current chat
        const generatedLink = generateLink(uuid);
        bot.sendMessage(chatId, `*Temp Link:*\n${generatedLink}`, {
            parse_mode: "Markdown",
        });
        logger.info("New link generated " + generatedLink);
    }
};

export default getLink;
