import messages from '@constants/messages'
import BuyerFactory from '@factory/buyerFactory'
import OrderFactory from '@factory/orderFactory'
import SellerFactory from '@factory/sellerFactory'
import retrieveUser from '@helpers/authHelpers'
import { Response, Request } from 'express'

export default class BuyerControllers {
    /**
     * get buyer
     */
    static async getBuyer(req: Request, res: Response): Promise<Response> {
        try {
            const { buyerId } = req.params
            if (!buyerId) return res.status(400).send(messages.badReq)
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
            if (!sellerId) return res.status(400).send(messages.badReq)
            const catalog = await SellerFactory.getCatalogBySellerId(sellerId)
            if (!catalog) return res.status(400).send(messages.notFound)

            return res.status(200).json(catalog)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    static async createOrder(req: Request, res: Response): Promise<Response> {
        try {
            const buyer = await retrieveUser(req)
            const buyerId = await buyer.email
            const { sellerId } = req.params
            if (!sellerId) return res.status(400).send(messages.badReq)
            const { productsIds } = req.body
            if (!productsIds || productsIds.length === 0) return res.status(400).send(messages.badReq)
            let order = await OrderFactory.createOrder({ sellerId, buyerId })
            productsIds.map(async (pId) => {
                await OrderFactory.createProductsInOrders(order.id, pId)
            })
            order = await OrderFactory.getOrder(order.id)

            return res.status(200).json(order)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * get orders
     */
    static async getOrders(req: Request, res: Response): Promise<Response> {
        try {
            const dbBuyer = await retrieveUser(req)

            const orders = await SellerFactory.getOrders(dbBuyer.email)

            return res.status(200).json(orders)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }
}
