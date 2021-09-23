import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/kgp-shop-db')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log("Successfully connected to database.".cyan.bold);
})

export default db;