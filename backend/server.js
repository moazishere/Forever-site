import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
// App Config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors({}))

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests 
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
            
    })
}).catch((error) => {
    console.log(error)
  })

