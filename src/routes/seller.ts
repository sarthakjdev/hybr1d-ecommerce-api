import SellerControllers from '@controllers/seller'
import { authorizeSeller, isAuthenticated } from '@middleware/auth'
import express from 'express'

const router = express.Router()

// get seller
router.get(
    '/:sellerId',
    isAuthenticated,
    authorizeSeller,
    SellerControllers.getSeller,
)

// get orders
router.get(
    '/orders',
    isAuthenticated,
    authorizeSeller,
    SellerControllers.getOrders,
)

// create catalog
router.post(
    '/createCatalog',
    isAuthenticated,
    authorizeSeller,
    SellerControllers.createCatalog,
)

// create product
router.post(
    '/createProduct',
    isAuthenticated,
    authorizeSeller,
    SellerControllers.createProduct,
)

export default router
