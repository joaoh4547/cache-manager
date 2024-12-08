declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            PORT: string;
            REDIS_HOST: string;
            REDIS_USER?: string;
            REDIS_PORT: string;
            REDIS_PASSWORD?: string;
            REDIS_DB?: string;
            REDIS_CLUSTER_NODES: string;
            HOST: string;
        }
    }
}

export {};