import express from "express";
import data from "./data";
import path from "path"
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';


const PORT=process.env.PORT || 5000;
dotenv.config();
const mongodbUrl=config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch((error)=>{ console.log(error.reason)
console.log('error')});


const app=express();
app.use(bodyParser.json());

app.use('/api/users',userRoute);
app.use('/api/products',productRoute);
app.use('/api/orders',orderRoute);
app.get('/api/config/paypal',(req,res)=>{
    res.send(config.PAYPAL_CLIENT_ID);
});

if(process.env.NODE_ENV=="production"){
app.use(express.static(path.join(__dirname,'/../frontend/build')));

app.get("*",(req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

}

app.listen(PORT,()=>{
    console.log("server running at port http://localhost:5000");
})