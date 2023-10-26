const Redis = require("ioredis");
const porcess = require("node:process");

const EMAIL_QUEUE = "email-queue";

const getRedisServices = () => {
  const redis = new Redis();

  redis.on("error", (err) => {
    console.log("Error on Redis");
    console.log(err);
    process.exit(1);
  });

  redis.on("connect", () => {
    console.log("Redis connected");
  });

  return redis;
};

module.exports = { EMAIL_QUEUE, getRedisServices };
