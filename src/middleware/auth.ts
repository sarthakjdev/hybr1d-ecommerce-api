import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import messages from '@constants/messages'
import { user_type } from '@prisma/client'
import UserFactory from '@factory/userFactory'
import config from '../configs/config'

/**
 * Is Authenticated
 */
export async function isAuthenticated(req: Request, res:Response, next: NextFunction) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) return res.status(401).send(messages.invalidToken)
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY)

        const { email } = decoded as any
        const dbUser = await UserFactory.getUser(email)

        if (dbUser) return next()

        return res.status(400).send(messages.unauthorized_req)
    } catch (error) {
        return res.status(500).send('Server error occured')
    }
}

/**
 * Authorize user
 */

export async function authorizeBuyer(req: Request, res:Response, next: NextFunction) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, config.JWT_SECRET_KEY)

        const { email } = decoded as any
        const dbUser = await UserFactory.getUser(email)

        if (dbUser.type === user_type.BUYER) return next()

        return res.status(400).send(messages.unauthorized_req)
    } catch (error) {
        return res.status(500).send('Server error occured')
    }
}

/**
 * Authorize admin
 */
export async function authorizeSeller(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, config.JWT_SECRET_KEY)

        const { email } = decoded as any
        const dbUser = await UserFactory.getUser(email)

        if (dbUser.type === user_type.SELLER) return next()

        return res.status(400).send(messages.unauthorized_req)
    } catch (error) {
        return res.status(500).send('Server error occured')
    }
}

