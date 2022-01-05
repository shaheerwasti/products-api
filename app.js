require('dotenv').config()
require('express-async-errors')
// async erros

const express = require('express')
const app = express();

const errorMiddleWare = require('./middleware/error-handler')
const notFoundMiddleWare = require('./middleware/not-found')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1><a href="api/v1/products">products route</a>')
})

app.use('/api/v1/products',productsRouter)

app.use(notFoundMiddleWare)
app.use(errorMiddleWare)

const port = process.env.PORT || 3000
const start = async () =>{
    try {
       await connectDB(process.env.MONGO_URI)
       app.listen(port,console.log(`server is listening port ${port}...`)) 
    } catch (error) {
        
    }
}

start()