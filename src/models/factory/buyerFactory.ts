import prisma from '@lib/prisma'
import { Buyers } from '@prisma/client'

export default class BuyerFactory {
    /**
     * get buyer
     */
    static async getBuyer(id: string): Promise<Buyers> {
        const buyer = await prisma.buyers.findFirst({
            where: {
                id,
            },
            include: {
                user: true,
                orders: true,
            },
        })

        return buyer
    }

    /**
     * create buyer
     */
    static async createBuyer(id: string): Promise<Buyers> {
        const buyer = await prisma.buyers.create({
            data: {
                id,
            },
            include: {
                user: true,
                orders: true,
            },
        })

        return buyer
    }

    /**
     * get all buyers
     */
    static async getAllBuyers(): Promise<Buyers[]> {
        const buyers = await prisma.buyers.findMany({
            include: {
                user: true,
            },
        })

        return buyers
    }

    /**
     * get orders of a buyer
     */
    static async getOrdersofBuyer(buyerId: string) {
        const orders = await prisma.orders.findMany({
            where: {
                buyerId,
            },
        })

        return orders
    }
}
