import Models from "../Models.js";



class UserService {
    async create(post) {
        const createdUser = await Models.User.create(post);
        return createdUser;
    }

    async getAll() {
        const user = await Models.User.find();
        return user;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('need ID')
        }
        const user = await Models.User.findById(id);
        return user;
    }

    async getOneByEmail(email) {
        const user = await Models.User.findOne(email);
        return user;
    }

    async update(user) {
         if (!user._id) {
             throw new Error('need ID')
         }
        const updatedUser = await Models.User.findByIdAndUpdate(user._id, user, {new: true})
        return updatedUser;
    }

    async delete(id) {
        if (!id) {
            throw new Error('need ID')
        }
        const user = await Models.User.findByIdAndDelete(id);
        return user;
    }
}


export default new UserService();
