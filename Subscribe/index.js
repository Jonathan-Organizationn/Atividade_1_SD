const { getRedisServices, EMAIL_QUEUE } = require("../Common/index");

const parseMessage = (message) => JSON.parse(message);

const listenQueue = async ({ redis }) => {
  await redis.subscribe(EMAIL_QUEUE, (err) => {
    if (err) {
      console.log("Falha ao inscrever-se: ", err.message);
      return;
    }
    console.log("Inscrição feita");
  });
  redis.on("message", (channel, message) => {
    const parsedMessage = parseMessage(message);
    console.log(`Recebido de ${channel}: `, parsedMessage);
  });
};

const redis = getRedisServices()(async () => listenQueue({ redis }))();
