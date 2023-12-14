/**
 * Generate a link based on the provided UUID.
 * @param uuid - The UUID to be included in the generated link.
 * @returns The generated link.
 */
export const generateLink = (uuid: string): string =>
    `https://t.me/${process.env.BOT_USERNAME}?start=${uuid}`;
