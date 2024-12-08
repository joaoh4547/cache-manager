import {CacheCoordinator} from "../@types/cache";
import {create} from "axios"
import {ALL_COORDINATOR, INVALIDATE_CACHE_URL} from "./consts";

export class CacheRequests {


    private static axios = create({
        validateStatus: () => false,
    })


    public static async invalidateCache(nodeUrl: string, coordinator?: CacheCoordinator) {
        const url = CacheRequests.getInvalidateUrl(nodeUrl + INVALIDATE_CACHE_URL, null)
        await CacheRequests.axios.post(url, {
            coordinator: coordinator ? coordinator.name : ALL_COORDINATOR
        })
    }


    private static getInvalidateUrl(baseUrl: string, coordinator: CacheCoordinator) {
        const str = []
        str.push(baseUrl)
        if (coordinator) {
            str.push(`/${coordinator.name}`)
        }
        return str.join('')
    }

}