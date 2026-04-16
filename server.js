import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDb } from "./connection/mongooseConnect.js";
import router from "./router/route.js";
import PostRouter from "./router/postRoute.js";

const app = express();

app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174'], 
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/auth",router);
app.use("/post",PostRouter);
app.use("/uploads",express.static("uploads"));
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running in http://localhost:${process.env.PORT}`)
})









//package.json scripts module  
//package.lockjson in dependience of the package

//typr=commonjs const express = require("packagename/filepath")