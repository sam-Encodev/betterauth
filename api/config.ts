const config = {
    server: {
        port: process.env.PORT,
        uri: process.env.SERVER_URL,
    },
    database: {
        uri: process.env.DB_URL,
        name: process.env.DB_NAME,
        url: process.env.MONGODB_URL,
    },
    auth: {
        origin: process.env.ORIGIN,
    },
};

export { config };
