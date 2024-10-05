import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({origin:'http://localhost:5173',credentials: true,}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())

import userRouter from './router/user.router.js'
app.use('/users',userRouter)
import productRouter from './router/product.router.js'
app.use('/products',productRouter)
import cartRouter from './router/cart.router.js'
app.use('/cart',cartRouter)

export {app}