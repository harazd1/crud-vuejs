import express from 'express'
import mongoose from 'mongoose'
import userRouter from "./users/userRouter.js";
import  controllers from 'controllers'
import cors from 'cors'
import eventRouter from "./events/eventRouter.js";
import authRouter from "./auth/authRouter.js";
import secret from "./config.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', userRouter)
app.use('/event', eventRouter)
app.use('/auth', authRouter)
app.use(controllers);


const DB_URL = secret.dbUrl
const PORT = secret.port

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(3000, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()