import express from "express"
import path from 'path'
import morgan from "morgan"
import colors from 'colors'
import dotenv from "dotenv"
import db from "./config/mongoose.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"


dotenv.config()

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//allow to expect json data in body or req.body
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve() //to make __dirname available in all files extensions like .js, .esj etc.
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

//in case user access the route that doesnot exist, throw this error
app.use(notFound)
//error handling middleware
app.use(errorHandler)

const Port = process.env.PORT || 8000;


app.listen(Port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode at ${Port}`.yellow.bold);
})
