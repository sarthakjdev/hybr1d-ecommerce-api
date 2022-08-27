import SellerControllers from '@controllers/seller'
import { authorizeSeller, isAuthenticated } from '@middleware/auth'
import express from 'express'

const router = express.Router()

// get seller
router.get('/:sellerId', isAuthenticated, authorizeSeller, SellerControllers.getSeller)

// create catalog
router.post('/createCatalog', isAuthenticated, authorizeSeller, SellerControllers.createCatalog)

// get orders
router.get('/orders', isAuthenticated, authorizeSeller, SellerControllers.getOrders)

export default router
