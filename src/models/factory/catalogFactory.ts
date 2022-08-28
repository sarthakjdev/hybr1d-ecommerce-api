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
        let seller = await prisma.sellers.findFirst({
            where: {
                id: sellerId,
            },
        })
        seller = await prisma.sellers.update({
            where: {
                id: sellerId,
            },
            data: {
                catalogId: catalog.id,
            },
        })

        return catalog
    }

    /**
     * add product to catalog
     */
    static async addProducts(
        productIds: number[],
        catalogId: number,
    ): Promise<Catalogs> {
        productIds.map(async (pId) => {
            await ProductFactory.updateCatalogId(pId, catalogId)
        })
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
