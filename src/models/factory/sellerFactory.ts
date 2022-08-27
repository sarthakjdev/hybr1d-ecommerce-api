import prisma from '@lib/prisma'
import { Catalogs, Orders, Sellers } from '@prisma/client'

export default class SellerFactory {
    /**
     * get seller
     */
    static async getSeller(sellerid: string): Promise<Sellers> {
        const seller = await prisma.sellers.findFirst({
            where: {
                id: sellerid,
            },
        })

        return seller
    }

    /**
     * create catalog
     */
    static async createCatalog(
        sellerId: string,
        catalogName: string,
    ): Promise<Catalogs> {
        const catalog = await prisma.catalogs.create({
            data: {
                sellerId,
                name: catalogName,
            },
        })

        return catalog
    }

    /**
     * get all sellers
     */
    static async getAllSellers(): Promise<Sellers[]> {
        const sellers = await prisma.sellers.findMany({
            include: {
                catalog: true,
            },
        })

        return sellers
    }

    /**
     * get orders
     */
    static async getOrders(sellerId: string): Promise<Orders[]> {
        const orders = await prisma.orders.findMany({
            where: {
                sellerId,
            },
        })

        return orders
    }

    /**
     * get catalog by seller id
     */
    static async getCatalogBySellerId(sellerId): Promise<Catalogs> {
        const catalog = await prisma.catalogs.findFirst({
            where: {
                sellerId,
            },
            include: {
                products: true,
            },
        })

        return catalog
    }
}
