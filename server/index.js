import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import generatorRouter from './routes/generatorRouter.js'

const app = express()
dotenv.config()
app.disable('x-powered-by')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-requested-With, Content-Type, Authorization')
  next()
})

app.use(express.json({limit: '10mb'}))


app.use('/user', userRouter)
app.use('/generator', generatorRouter)

app.get('/', (req, res) => res.json({message: 'Welcome to our API'}))
app.use((req, res) => res.status(404).json({success: false, message: 'Not Found'}))

const port = process.env.PORT || 5000

const startServer = async() => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT)
    app.listen(port, () => console.log(`Server is listening on port: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

startServer()
