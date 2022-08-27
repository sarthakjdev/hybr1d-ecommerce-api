import express from 'express'
import AuthController from '@controllers/auth'

const router = express.Router()

// signup user
router.post('/', AuthController.signUp)

// login user
router.post('/login', AuthController.signIn)

// regenrate token
router.post('/token', AuthController.revalidateToken)

export default router
