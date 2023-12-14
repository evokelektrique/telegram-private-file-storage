import "reflect-metadata";
import bot from "./bot/bot";
import getLink from "./bot/event/getLink";
import getContent from "./bot/event/getContent";

/**
 * Attach the getLink function to handle incoming messages.
 */
bot.on("message", getLink);

/**
 * Attach the getContent function to handle messages starting with "/start".
 * The regular expression captures the UUID in the message.
 */
bot.onText(/\/start (.+)/, getContent);
