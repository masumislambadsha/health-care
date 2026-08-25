import { createClient } from 'redis';
import config from '../config';

export const redisClient = createClient({
    username: config.redis_user,
    password: config.redis_password,
    socket: {
        host: config.redis_host,
        port: Number(config.redis_port),
        reconnectStrategy: (retries) => Math.min(retries * 1000, 15000)
    }
});

redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err.message);
});

redisClient.on("reconnecting", () => {
    console.log("Redis reconnecting...");
});

