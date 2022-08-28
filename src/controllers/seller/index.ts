import messages from '@constants/messages'
import CatalogFactory from '@factory/catalogFactory'
import ProductFactory from '@factory/productFactory'
import SellerFactory from '@factory/sellerFactory'
import retrieveUser from '@helpers/authHelpers'
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
            const { productsIds, name } = req.body

            if (!productsIds || !name) return res.status(400).send(messages.badReq)

            let catalog
            catalog = await SellerFactory.getCatalogBySellerId(dbSeller.email)
            if (catalog) return res.status(409).send('Seller already has a catalog')
            catalog = await CatalogFactory.createCatalog(dbSeller.email, name)

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catalog = await CatalogFactory.addProducts(productsIds, catalog.id)

            return res.status(200).json(catalog)
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * create product
     */
    static async createProduct(req: Request, res: Response): Promise<Response> {
        try {
            const { name, price } = req.body

            if (!name || !price) return res.status(400).send(messages.notFound)

            const product = await ProductFactory.createProduct({ name, price })

            return res.status(200).json(product)
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
