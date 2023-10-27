const Fastify = require("fastify");
const { EMAIL_QUEUE, getRedisServices } = require("../Common/index");

const buildMessage = (body) => JSON.stringify(body);

const sendMessageToQueue = async ({ message, user, queue, redis }) => {
  const Time = new Date();
  const timeFormat =
    Time.getHours() + ":" + Time.getMinutes() + ":" + Time.getSeconds();

  const MessageFormat = {
    message: message,
    user: user,
    data: timeFormat,
  };
  await redis.publish(queue, buildMessage(MessageFormat));
  // Caso queira ver a mensagem publicada
  // console.log("Mensagem publicada: ", MessageFormat)
};

const app = Fastify();
const redis = getRedisServices();

app.post("/pub", async (req) => {
  await sendMessageToQueue({
    message: req.body.message,
    user: req.body.user,
    queue: EMAIL_QUEUE,
    redis,
  });
});

app.listen({ port: 3000 }).then(() => console.log("Server On"));
