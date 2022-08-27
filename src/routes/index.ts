import express from 'express'
import buyerRoutes from './buyer'
import sellerRoutes from './seller'
import authRoutes from './auth'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/buyer', buyerRoutes)
router.use('/seller', sellerRoutes)

export default router
