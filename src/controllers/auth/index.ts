import { Request, Response } from 'express'
import messages from '@constants/messages'
import { checkPassword, checkRole, generateHash } from '@helpers/password'
import config from '@configs/config'
import { Users } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { generateJwt, generateRefreshToken } from '@helpers/authHelpers'
import UserFactory from '@factory/userFactory'

export default class AuthController {
    /**
     *  Sign up the user
     */
    static async signUp(req: Request, res: Response) {
        try {
            const dbUser = await UserFactory.getUser(req.body.email)
            if (dbUser) return res.status(409).send('user already exists')

            const userData: Users = { ...req.body }
            const hashedPassword = await generateHash(userData.password)
            const token = await generateJwt(
                { type: userData.type, email: userData.email },
                config.JWT_SECRET_KEY,
            )
            const refreshToken = await generateRefreshToken(
                { userType: userData.type, email: userData.email },
                config.JWT_REFRESH_SECRET_KEY,
            )
            userData.password = hashedPassword
            userData.authToken = refreshToken

            const user = await UserFactory.createUser(userData)

            return res.status(201).json({
                token,
                refreshToken,
                user,
                message: messages.signup_success,
            })
        } catch (err) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * logging in user
     */
    static async signIn(req: Request, res: Response) {
        try {
            const { email, userType, password } = req.body
            const dbUser = await UserFactory.getUser(email)
            if (!dbUser) return res.status(404).send(messages.notFound)

            const isAuthenticated = await checkPassword(
                password,
                dbUser.password,
            )
            const verifiedRole = await checkRole(dbUser, userType)
            if (!isAuthenticated || !verifiedRole) return res.status(404).send('Invalid Username/password')

            const token = await generateJwt(
                { user_type: dbUser.type, email: dbUser.email },
                config.JWT_SECRET_KEY,
            )

            const refreshToken = await generateRefreshToken(
                { user_type: dbUser.type, email: dbUser.email },
                config.JWT_REFRESH_SECRET_KEY,
            )

            const updatedUser = await UserFactory.updateAuthToken(
                dbUser,
                refreshToken,
            )

            return res.status(200).json({
                token,
                refreshToken,
                user: updatedUser,
                message: messages.login_success,
            })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }

    /**
     * Regenerate token
     */
    static async revalidateToken(req: Request, res: Response) {
        try {
            const { token } = req.body
            if (!token) return res.status(400).send(messages.invalidToken)
            const refreshToken = token.split(' ')[1]
            const decodedPayload = await jwt.verify(refreshToken, config.JWT_REFRESH_SECRET_KEY)

            const { email } = decodedPayload as any

            const dbUser = await UserFactory.getUser(email)

            let newToken: string
            if (dbUser.authToken === refreshToken) newToken = await generateJwt({ email: dbUser.email, userType: dbUser.type }, config.JWT_SECRET_KEY)

            return res.status(200).json({ token: newToken, messages: 'New token generated succesfully' })
        } catch (error) {
            return res.status(500).send(messages.serverError)
        }
    }
}
