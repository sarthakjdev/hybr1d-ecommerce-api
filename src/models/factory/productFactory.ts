import prisma from '@lib/prisma'
import {
    Buyers, Catalogs, Products, Sellers,
} from '@prisma/client'

export default class ProductFactory {
    /**
     * get product
     */
    static async getProduct(id: number): Promise<Products> {
        const product = await prisma.products.findFirst({
            where: {
                id,
            },
            include: {
                catalog: true,
            },
        })

        return product
    }

    /**
     * create product
     */
    static async createProduct(
        productDetails,
        catalogId?: number,
    ): Promise<Products> {
        const product = await prisma.products.create({
            data: {
                name: productDetails.name,
                price: Number(productDetails.price),
                catalogId,
            },
        })

        return product
    }

    /**
     * update catalog Id of product
     */
    static async updateCatalogId(
        productId: number,
        catalogId: number,
    ): Promise<Products> {
        const product = await prisma.products.update({
            where: {
                id: productId,
            },
            data: {
                catalogId,
            },
        })

        return product
    }
}
