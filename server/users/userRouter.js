import Router from 'express'
import UserController from "./UserController.js";
const userRouter = new Router()

userRouter.post('/', UserController.create)
userRouter.get('/', UserController.getAll)
userRouter.get('/:id', UserController.getOne)
userRouter.put('/', UserController.update)
userRouter.delete('/:id', UserController.delete)


export default userRouter;
