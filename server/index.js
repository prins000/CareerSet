import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongo from './utils/db.js';
import userRoutes from './routes/user.routes.js'
import companyRoutes from './routes/company.routes.js';
import jobRoutes from './routes/jobs.routes.js';
import applicationRoutes from './routes/application.routes.js';
import path from 'path';


dotenv.config({});


const app= express();
const port=process.env.port || 6000;

const corsOptions={
    origin:process.env.NODE_ENV === 'production' ? true : ['http://localhost:5173'],
    credentials:true,
}

//middelwares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Serve static files from public directory
app.use('/public', express.static(path.join(process.cwd(), 'public')));


app.listen(port,()=>{
    
    console.log(`Server is running on  ${port}`);
    mongo();
})

//APIS Routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/company',companyRoutes);
app.use('/api/v1/job',jobRoutes);   
app.use('/api/v1/application',applicationRoutes);

