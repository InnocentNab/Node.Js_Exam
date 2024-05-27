import redis from "redis";
const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("connect", () => {
  console.log("connected to redis");
});

client.on("error", (err) => {
  console.log("Error " + err);
});
export default client;
