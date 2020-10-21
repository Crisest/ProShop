import colors from 'colors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import {errorHandler, notFound } from './middleware/errorMiddleware.js'


dotenv.config()

connectDB()

const app = express()
app.use('/api/products', productRoutes)


app.get('/', (req, res) => {
    res.send('API is running')
})

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on Port ${PORT}`.yellow.bold))