import {Request, Response} from "express";

export class CacheController {

    public async getCache(req: Request, res: Response): Promise<any> {
        return res.json({
            teste: "123"
        })
    }

}