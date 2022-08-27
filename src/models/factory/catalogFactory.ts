import prisma from '@lib/prisma'
import { Buyers, Catalogs } from '@prisma/client'
import ProductFactory from './productFactory'

export default class CatalogFactory {
    /**
     * get buyer
     */
    static async getCatalog(id: string): Promise<Buyers> {
        const buyer = await prisma.buyers.findFirst({
            where: {
                id,
            },
            include: {
                user: true,
            },
        })

        return buyer
    }

    /**
     * add product to catalog
     */
    static async addProducts(productDetails, catalogId): Promise<Catalogs> {
        const productAdded = await ProductFactory.createProduct(
            productDetails,
            catalogId,
        )
        const catalog = await prisma.catalogs.findFirst({
            where: {
                id: catalogId,
            },
            include: {
                products: true,
                seller: true,
            },
        })

        return catalog
    }
}
