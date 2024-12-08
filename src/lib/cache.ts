import {CacheCoordinator, CacheEvent, CacheRegistry} from "../@types/cache";
import {CacheRequests} from "./http";
import * as process from "node:process";

export class CacheManager {
    private events = new Map<CacheEvent, ((e: CacheEvent, params: unknown) => Promise<void>)[]>();
    private static instance: CacheManager;

    private caches: CacheRegistry[]

    private cacheMap: Map<CacheCoordinator, Cache[]>;


    public static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    private constructor() {
        this.registerEvents()
    }

    private registerEvents() {
        this.on('del', async (e, params) => {
            const nodes = process.env.NODES.split(',')
            if (params.length > 0) {
                const coordinator = params[0] as CacheCoordinator
                nodes.forEach(node => {
                    CacheRequests.invalidateCache(node, coordinator)
                })
            } else {
                nodes.forEach(node => {
                    CacheRequests.invalidateCache(node)
                })
            }
        })
    }

    public on(event: CacheEvent, callback: (e: CacheEvent, params: unknown[]) => Promise<void>): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    public async emit(event: CacheEvent, ...args: unknown[]): Promise<void> {
        if (this.events.has(event)) {
            const callbacks = this.events.get(event);
            if (callbacks) {
                for (const callback of callbacks) {
                    await callback(event, args)
                }
            }
        }
    }

    public async invalidate(coordinator?: CacheCoordinator) {
        const event: CacheEvent = 'del'

        if (coordinator) {
            if (this.cacheMap.has(coordinator)) {
                this.caches = [...this.caches.filter(cache => cache.coordinator !== coordinator)]
                this.cacheMap.delete(coordinator);
            }
            await this.emit(event, [coordinator])
        } else {
            this.cacheMap.clear()
            this.caches = []
            await this.emit(event, [])
        }
    }


}
