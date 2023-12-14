import { DataSource } from "typeorm";
import { Message } from "./entity/Message";
import logger from "./logger";

// Create a new DataSource instance for the application
export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Message],
    migrations: [],
    subscribers: [],
});

/**
 * Initialize the application's data source.
 */
export const initDataSource = async () => {
    try {
        // Asynchronously initialize the data source
        await appDataSource.initialize();
        logger.info("Postgres connected!");
    } catch (error) {
        // Handle initialization errors
        logger.error("Error during Data Source initialization" + JSON.stringify(error));
    }
};

// Initialize the data source and log the result
initDataSource().then(() => {
    logger.info("Data Source has been initialized!");
});
