
//when URL is wrong/doesn't exist
const notFound = (req, res, next)=>{
    const error = new Error(`Route Not Found- ${req.originalUrl}`)
    res.status(404)
    next(error)
}

//when id is wrong and is not in format of ObjectId
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode === 200 ? 500 :res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound, errorHandler}