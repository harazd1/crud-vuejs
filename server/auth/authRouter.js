import Router from 'express'
import AuthController from "./AuthController.js";
const userRouter = new Router()

userRouter.post('/', AuthController.registration)

userRouter.post('/login', AuthController.authorization)


export default userRouter;
