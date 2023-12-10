import bot from "bot";
import getLink from "event/getLink";

/**
 * 
 * Example usage: reply to a message with /getLink
 */
bot.onText(/\/getLink (.+)/, getLink);
