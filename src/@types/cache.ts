type CacheCoordinator = {
    name: string;
}

type Cache = {
    key: string;
    value: unknown;
}

type CacheRegistry = {
    coordinator: CacheCoordinator
    caches: Cache[]
}

type CacheEvent = 'set' | 'get' | 'del' | 'clear' | 'keys' | 'dump' | 'restore';






export {CacheCoordinator, Cache, CacheRegistry, CacheEvent}