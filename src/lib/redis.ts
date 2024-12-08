import {createClient, createCluster, RedisClientType, RedisClusterType} from 'redis';
import * as process from "node:process";
import logger from "./logguer";


type RedisUrlConfig = {
    url: string
}

export class RedisManager {

    private static instance: RedisManager;

    private _cluster: RedisClusterType | undefined;
    private _client: RedisClientType | undefined;

    private _connected = false;

    private constructor() {
    }

    public static getInstance() {
        if (!RedisManager.instance) {
            RedisManager.instance = new RedisManager();
        }
        return RedisManager.instance;
    }


    public async get() {
        if (this.isClustered()) {
            const redisUrls = this.getRedisUrls();
            if (!this._cluster) {
                this._cluster = createCluster({
                    rootNodes: redisUrls
                });
                this._cluster.on('error', (err) => {
                    logger.log('crit', 'Redis error: ' + err);
                });
                this._cluster.on('connect', () => {
                    logger.info('Redis connected');
                });
            }

            if (!this.isConnected()) {
                await this._cluster.connect();
                this._connected = true;
            }

            return this._cluster;
        } else {
            if (!this._client) {
                const str = []
                const redisHost = process.env.REDIS_HOST || 'localhost';
                const redisUser = process.env.REDIS_USER || '';
                const redisPort = process.env.REDIS_PORT || 6379;
                const redisPassword = process.env.REDIS_PASSWORD || '';
                const redisDb = process.env.REDIS_DB || '';


                str.push('redis://')

                if (redisUser && redisPassword) {
                    str.push(`${redisUser}:${redisPassword}@`);
                }
                str.push(`${redisHost}:${redisPort}`);

                if (redisDb) {
                    str.push(`/${redisDb}`)
                }

                this._client = createClient({url: str.join('')})
            }


            if (!this.isConnected()) {
                await this._client.connect();
                this._connected = true;
            }
            return this._client;
        }
    }

    private getRedisUrls(): Array<{ url: string }> {
        return String(process.env!.REDIS_CLUSTER_NODES)
            .split(',')
            .map(url => ({url: url.trim()}) as RedisUrlConfig);
    }

    private isClustered() {
        return process.env.REDIS_CLUSTER_NODES !== undefined;
    }


    private isConnected() {
        return this._connected;
    }

    public async testRedisConnection() {
        await this.get();
        logger.info('Conexão com o Redis estabelecida com sucesso!');
    }
}