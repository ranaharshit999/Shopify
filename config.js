import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGODB_URL:process.env.MONGODB_URL|| 'mongodb+srv://Harshit:fCYcQJ0oZXWOunCJ@cluster0.hdilo.mongodb.net/<dbname>?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET|| 'somethingsecret',
}
//mongodb://localhost/shopify

//Password-zHaLtUpvM0TF7QrY

//password-shop-->fCYcQJ0oZXWOunCJ

//connection-string-->mongodb+srv://Harshit:<password>@cluster0.hdilo.mongodb.net/<dbname>?retryWrites=true&w=majority