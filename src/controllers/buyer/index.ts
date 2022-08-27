import messages from '@constants/messages'
import BuyerFactory from '@factory/buyerFactory'
import SellerFactory from '@factory/sellerFactory'
import { Response, Request } from 'express'

export default class BuyerControllers {
    /**
     * get buyer
     */
    static async getBuyer(req: Request, res: Response): Promise<Response> {
        try {
            const { buyerId } = req.params
            if (!buyerId) return res.status(400).send(messages.notFound)
            const buyer = await BuyerFactory.getBuyer(buyerId)
            if (!buyer) return res.status(400).send(messages.notFound)

            return res.status(200).json(buyer)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * get list of sellers
     */
    static async getListOfSellers(
        req: Request,
        res: Response,
    ): Promise<Response> {
        try {
            const sellers = await SellerFactory.getAllSellers()

            return res.status(200).json(sellers)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * get catalog by seller-id
     */
    static async getCatalogBySellerId(
        req: Request,
        res: Response,
    ): Promise<Response> {
        try {
            const { sellerId } = req.params
            if (!sellerId) return res.status(400).send(messages.notFound)
            const catalog = await SellerFactory.getCatalogBySellerId(sellerId)
            if (!catalog) return res.status(400).send(messages.notFound)

            return res.status(200).json(catalog)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    static async createOrder(req: Request, res: Response): Promise<Response> {
        try {
            const { sellerId } = req.params

            const { productsIds } = req.body
            if (!sellerId) return res.status(400).send(messages.notFound)
            const catalog = await SellerFactory.getCatalogBySellerId(sellerId)
            if (!catalog) return res.status(400).send(messages.notFound)

            return res.status(200).json(catalog)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }
}
