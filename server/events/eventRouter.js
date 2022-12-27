import Router from 'express'
import EventController from "./EventController.js";
const eventRouter = new Router()


eventRouter.post('/', EventController.create)
eventRouter.get('/', EventController.getAll)
eventRouter.get('/:id', EventController.getOne)
eventRouter.delete('/:id', EventController.delete)

export default eventRouter;
