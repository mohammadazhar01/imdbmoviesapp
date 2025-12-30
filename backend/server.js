import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import startImdbWorker from './workers/imdbWorker.js'
import connectDB from './config/db.js'
import authRouter from './routes/auth.route.js'
import movieRouter from './routes/movie.route.js'
import connectCloudinary from './config/cloudinary.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 7000
const allowedOrigins = [process.env.FRONTEND_URL,'http://localhost:5173']

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

await connectDB()
await connectCloudinary()
startImdbWorker()


app.get('/', (req, res)=> {
    res.send("Backend is working properly")
})

app.use('/user', authRouter)
app.use('/movies', movieRouter)

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})

