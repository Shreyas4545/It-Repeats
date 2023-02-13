import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import bodyParser, { urlencoded, json } from 'body-parser';
import cors from 'cors';
import routers from './routers/index.route.js';
import userroutes from "./routers/userrouter.js";
import cookieParser from "cookie-parser"

//app initialization
const app = express();

//cookies and filemiddleware
app.use(cookieParser())
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan("tiny"))
app.use(bodyParser.raw({ type: 'application/octet-stream' }));
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(json());

//routes for api calls
app.use('/api/question-paper', routers);
app.use('/api/user',userroutes);
app.get("/",function(req,res){
    res.send("Hello welcome");
})
export default app;