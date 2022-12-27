import Models from "../Models.js";





class EventService {
    async create(post) {
        const createdEvent = await Models.Event.create(post);
        return createdEvent;
    }

    async getAll() {
        const event = await Models.Event.find();
        return event;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('need ID')
        }
        const event = await Models.Event.findById(id);
        return event;
    }


    async delete(id) {
        if (!id) {
            throw new Error('need ID')
        }
        const event = await Models.Event.findByIdAndDelete(id);
        return event;
    }
}


export default new EventService();
