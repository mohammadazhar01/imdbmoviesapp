import express,{Router} from 'express'
import { isAuth, login, logout, register } from '../controllers/auth.controller.js'
import authUser from '../middlewares/auth.middleware.js'

const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.get('/is-auth',authUser, isAuth)
authRouter.get('/logout', logout)


export default authRouter