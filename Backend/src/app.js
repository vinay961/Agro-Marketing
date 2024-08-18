import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())

import userRouter from './router/user.router.js'
app.use('/api/users',userRouter)

export {app}