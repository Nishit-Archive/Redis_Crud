// index.js
const express = require("express");
const dotenv = require("dotenv");
const { createClient } = require("redis");
const cors = require("cors");
const route = require("./route");

dotenv.config();

const redisPassword = process.env.REDIS_PASSWORD;
const redisHost = process.env.REDIS_HOST;

const app = express();
app.use(cors()); // Configure CORS
app.use(express.json());

const PORT = 5000;

const client = createClient({
  password: "B5oQhU80mwWzh9et3846X5R6DSoknwpn",
  socket: {
    host: "redis-14284.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 14284,
  },
});

// Global error handler for Redis client
client.on("error", (err) => {
  console.error("Redis Client Error: " + err);
});

app.get("/", async (req, res) => {
  try {
    await client.connect();
    await client.set("My Key", "Hey, I am Nishit. Learn Redis.");
    const value = await client.get("My Key");
    res.send(`Hello World! ${value}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.disconnect();
  }
});

route(app, client); // Passing app and client to route.js

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
