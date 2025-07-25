const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    }
});

const productSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },  
    products :[{
        productName : {
            type: String,
            required: true,
            trim: true,
            maxLength: 100
        },
        productDescription : {
            type: String,
            required: true,
            maxLength: 500
        },
        productThumbnail : {
            type: String,
            required: true,
            maxLength: 500
        },
        productFile : {
            type: String,
            required: true,
            maxLength: 500
        },
        sales : {
            type: Number,
            required: true,
            default: 0
        },
        revenue : {
            type: Number,
            required: true,
            default: 0
        },
        price : {
            type: Number,
            required: true,
            default: 0
        },
        published : {
            type: Boolean,
            required: true,
            default: false
        }
    }]
});


const PublishedProductSchema = new mongoose.Schema({
    productId : {
        type: String,
        required: true
    },
    productOwner :{
        type: String,
        required: true
    },
    productName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },

    productDescription : {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    productThumbnail : {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    sales : { 
        type: Number,
        required: true,
        default: 0
    },
    price : {
        type: Number,
        required: true,
        default: 0
    }
})



const User = new mongoose.model("User",userSchema);
const Product = new mongoose.model("Product",productSchema);
const PublishedProducts = new mongoose.model("PublishedProducts",PublishedProductSchema); 

module.exports  = {
    User,
    Product,
    PublishedProducts
};