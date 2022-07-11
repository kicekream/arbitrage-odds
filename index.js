/* eslint-disable no-console */
const app = require('./src/app');
const { connect } = require('./src/config');
// const { redisClient } = require('./src/config');

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  await connect(process.env.MONGODB_URI);
//   await redisClient.connect();
  app.listen(PORT, (err) => {
    if (err) {
    //   logger.error(err);

    console.log(err);
      return;
    }
    // logger.info(`Bot listenenig on port ${PORT}`);

    console.log("Bot listenenig on port", PORT);
  });
};

startServer();