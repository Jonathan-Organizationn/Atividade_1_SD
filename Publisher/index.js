const Fastify = require("fastify");
const { EMAIL_QUEUE, getRedisServices } = require("../Common/index");

const buildMessage = (body) => JSON.stringify(body);

const formatDate = (date) => {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();

  const dateFormat = `${dia}/${mes}/${ano}`;

  return dateFormat;
};

const sendMessageToQueue = async ({ message, user, queue, redis }) => {
  const data = formatDate(new Date());

  const MessageFormat = {
    message: message,
    user: user,
    data: data,
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
