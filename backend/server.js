import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import aiRouter from './routes/aiRoute.js'
// App Config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

// middleware
app.use(express.json())
const allowedOrigins = [
  'https://forever-site-frontend.vercel.app',    
  'https://forever-site-admin.vercel.app',      
  'http://localhost:5173',                 
  'http://localhost:5174',
  'http://localhost:4000'                 
];

const corsOptions = {
    origin: function (origin, callback) {
        if(!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/ai', aiRouter)
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

