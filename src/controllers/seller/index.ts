import messages from '@constants/messages'
import SellerFactory from '@factory/sellerFactory'
import retrieveUser from '@helpers/authHelpers'
import prisma from '@lib/prisma'
import { Response, Request } from 'express'

export default class SellerControllers {
    /**
     * get seller
     */
    static async getSeller(req: Request, res: Response): Promise<Response> {
        try {
            const { sellerId } = req.params
            if (!sellerId) return res.status(400).send(messages.notFound)
            const seller = await SellerFactory.getSeller(sellerId)
            if (!seller) return res.status(400).send(messages.notFound)

            return res.status(200).json(seller)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
 * create catalog
 */
    static async createCatalog(req: Request, res: Response): Promise<Response> {
        try {
            const dbSeller = await retrieveUser(req)

            const { sellerId } = req.params
            if (!sellerId) return res.status(400).send(messages.notFound)
            const seller = await SellerFactory.getSeller(sellerId)
            if (!seller) return res.status(400).send(messages.notFound)

            return res.status(200).json()
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
* get orders
*/
    static async getOrders(req: Request, res: Response): Promise<Response> {
        try {
            const dbSeller = await retrieveUser(req)

            const orders = await SellerFactory.getOrders(dbSeller.email)

            return res.status(200).json(orders)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }
}
