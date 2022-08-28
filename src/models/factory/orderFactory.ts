import prisma from '@lib/prisma'
import { Orders } from '@prisma/client'

export default class OrderFactory {
    /**
     * create order
     */
    static async createOrder(orderData): Promise<Orders> {
        const order = await prisma.orders.create({
            data: {
                buyerId: orderData.buyerId,
                sellerId: orderData.sellerId,
            },
        })

        return order
    }

    /**
     * get order by id
     */
    static async getOrder(orderId: number): Promise<Orders> {
        const order = await prisma.orders.findFirst({
            where: {
                id: orderId,
            },
            include: {
                seller: true,
                buyer: true,
            },
        })

        return order
    }

    /**
     * create products in orders
     */
    static async createProductsInOrders(orderId: number, productId: number) {
        const productsInOrder = await prisma.productsInOrders.create({
            data: {
                orderId,
                productId,
            },
        })

        return productsInOrder
    }
}
