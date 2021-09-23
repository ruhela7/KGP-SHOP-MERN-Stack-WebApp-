
//This file aims is to perform CRUD operations on Models documents.

import mongoose from 'mongoose'
import dotenv from "dotenv"
import colors from 'colors'
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import db from "./config/mongoose.js"

dotenv.config()
db

const importData = async ()=>{
    try{
        //first wipping out the database
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        //We want to put admin id from User(stroed from user.js) into each document of Product. So that admin can be connected to eact product.
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product =>{
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts);
        console.log("Data Imported".green.inverse);
        process.exit();

    }catch(err){
        console.log(`Error in Importing data: ${err}`.red.inverse);
        process.exit(1)
    }
}


const destroyData = async ()=>{
    try{
        //wipping out the database
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log("Data Destroyed".green.inverse);
        process.exit();

    }catch(err){
        console.log(`Error in destroying data: ${err}`.red.inverse);
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}






