import express from 'express'
const router = express.Router()
import authController from '../controllers/authController';
import { validRegister } from '../middleware/valid'

router.post('/register', validRegister, authController.register)
router.post('/active', authController.activeAccount)
router.post('/login', authController.login)
router.post('/login_google', authController.loginGoogle)
router.post('/login_sms', authController.loginSms)
router.post('/verify_sms', authController.vefifySms)
router.get('/logout', authController.logout)
router.get('/refresh_token', authController.refrestToken)





export default router;