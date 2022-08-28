import jwt from 'jsonwebtoken'
import config from '@configs/config'
import { Request } from 'express'
import UserFactory from '@factory/userFactory'

export async function generateJwt(data: object, secretKey: string) {
    const token = await jwt.sign(data, secretKey, { expiresIn: '30d' })

    return token
}

export async function generateRefreshToken(data: object, secretKey: string) {
    const refreshToken = await jwt.sign(data, secretKey, { expiresIn: '30d' })

    return refreshToken
}

export async function verifyToken(token: string, secretKey: string) {
    const verified = jwt.verify(token, secretKey)

    return verified
}

export default async function retrieveUser(req: Request) {
    const token = req.headers?.authorization?.split(' ')[1]

    const decodedPayload = await verifyToken(token, config.JWT_SECRET_KEY)

    const { email } = decodedPayload as any

    const dbUser = await UserFactory.getUser(email)

    return dbUser
}
