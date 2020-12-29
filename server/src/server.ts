import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subsRoutes from './routes/subs'
import trim from './middleware/trim'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.get('/', (_, res) => res.send('Hello World'))
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/subs', subsRoutes)

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`)

  try {
    await createConnection()
    console.log('Database connected!')
  } catch (err) {
    console.log(err)
  }
})