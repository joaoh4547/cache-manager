import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {v4 as uuidv4} from 'uuid';
import logger from "./lib/logguer";
import {format} from "date-fns";

import 'dotenv/config'
import {RedisManager} from "./lib/redis";
import * as process from "node:process";


const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
const app = express();

const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const requestId = uuidv4(); // Gera um novo UUID
    req.headers['X-Request-ID'] = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
};

app.use(requestIdMiddleware);

app.use(cors());
app.use(express.json());

morgan.token('id', (req: Request) => req.headers['X-Request-ID'] as string);

morgan.format('custom', (tokens, req, res) => {
    const date = format(new Date(), 'dd-MM-yyyy hh:mm:ss a');
    return `${date} [REQUEST-ID ${tokens.id(req, res)}]  ${tokens.method(req, res)} ${tokens.url(req, res)} for ${tokens['remote-addr'](req, res)}`;
});


app.use(
    morgan("custom", {
        immediate: true,
    })
);


app.get('/', (req, res) => {
    const reqId = req.headers['X-Request-ID']
    logger.info('Request ID in Response: ' + reqId);
    res.status(200).json({message: 'Hello, world!', requestId: reqId});
});


(async () => {
    try {
        await RedisManager.getInstance().testRedisConnection()
        app.listen(PORT, () => {
            logger.info(`Server running on ${HOSTNAME}:${PORT}`);
        });
    } catch (e) {
        logger.log('fatal', 'Erro: ' + e)
        process.exit(1)
    }
})()