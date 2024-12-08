import {CacheManager} from "../lib/cache";

export class CacheService {




    public getAllCaches() {
        CacheManager.getInstance().on('get', (e,params) => {
            const x = params[0]
        })
    }

}