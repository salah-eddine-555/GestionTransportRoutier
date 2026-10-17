import rateLimit from 'express-rate-limit';
import {RedisStore} from 'rate-limit-redis';
import redisClient from '../config/redis.js';


const createRedisStore = (prefix) => {

    return new RedisStore({
        sendCommand: (...args)=> redisClient.sendCommand(args), prefix
    })
}



export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false, // empeche les anncinne headers
    store: createRedisStore("rl:auth:"),
    message: {
        succes: false,
        message: "Too many authentication requets. Tray again"
    }
});

export const standardApiLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false,
    store: createRedisStore("rl:standart:"),
    message: {
        success: false,
        message: "You have reached the analytics request limit. Please try again later"
    }
})


export const analyticsLimiter = rateLimit({
    windowMs : 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    store: createRedisStore("rl:analytics"),
     message: {
        success: false,
        message: "vous attiend la limit de requests , essayer encore"
    }
})

