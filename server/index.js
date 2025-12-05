import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongo from './utils/db.js';
import userRoutes from './routes/user.routes.js'

dotenv.config({});


const app= express();
const port=process.env.port || 6000;

const corsOptions={
    origin:'http//localhost:5173',
    credentials:true,
}

//middelwares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.listen(port,()=>{
    
    console.log(`Server is running on  ${port}`);
    mongo();
})

//APIS Routes
app.use('/api/v1/user',userRoutes);
