const { createLogger, transports, format } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const timezoned = () => {
    return new Date().toLocaleString("en-US", {
        timeZone: process.env.TIMEZONE,
    });
};

// Create a logger instance
const logger = createLogger({
    level: "debug", // Minimum logging level
    format: format.combine(
        format.timestamp({ format: timezoned }),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        // Log to the console if not in production
        new transports.Console(),

        // Log to a daily rotating file
        new DailyRotateFile({
            filename: "logs/app-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxFiles: "30d",
        }),
    ].filter(Boolean), // Remove falsy values (e.g., null) from the array
});

export default logger;
