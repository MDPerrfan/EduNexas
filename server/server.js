import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import clerkWebhooks, { stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './config/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRouter.js'
import testimonialRouter from './routes/testimonialRoute.js'


const app = express()
connectDB()
connectCloudinary()
    //Middlewares
const allowedOrigins = [
    'http://localhost:5173',
    'https://edunexas.vercel.app'
]
app.use(cors({
    origin: allowedOrigins
}))
app.use(clerkMiddleware())

//Routes
app.get('/', (req, res) => res.send("API working"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.use('/api/testimonial', testimonialRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)
    //Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running.")
})