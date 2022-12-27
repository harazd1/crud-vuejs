import mongoose from 'mongoose';

const User = new mongoose.Schema({
    UserName: {type: String, required: true},
    Email: {type: String, required: true, unique: true},
    PhoneNumber: {type: String, required: true},
    Password: {type: String, required: true}
})

const Event = new mongoose.Schema({
    user_id: {type: String, required: true},
    title: {type: String, required: true, unique: true},
    description: {type: String, required: false},
    startDate: {type: String, required: false},
    endDate: {type: String, required: false}
})

//export default mongoose.model('Event', Event)
export default {
    User: mongoose.model('Models', User),
    Event: mongoose.model('Event', Event)
}

