import BuyerControllers from '@controllers/buyer'
import { authorizeBuyer, isAuthenticated } from '@middleware/auth'
import express from 'express'

const router = express.Router()

// get list of sellers
router.get('/listOfSellers', isAuthenticated, authorizeBuyer, BuyerControllers.getListOfSellers)

// get buyer
router.get('/:buyerId', isAuthenticated, authorizeBuyer, BuyerControllers.getBuyer)

// get catalog
router.get('/sellerCatalog/:sellerId', isAuthenticated, authorizeBuyer, BuyerControllers.getCatalogBySellerId)

// create order
router.post('/createOrder/:sellerId', isAuthenticated, authorizeBuyer, BuyerControllers.createOrder)

export default router
