import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import aiRoutes from './routes/aiRoutes.js';



dotenv.config();

const app=express();

app.use(cors({
   origin:process.env.FRONTEND_URL,
   credentials:true,
}));
app.use(express.json());

app.use('/api/ai',aiRoutes); //http://localhost:5001/api/ai/ask

app.get('/',(req,res)=>{
    res.send("Gemini Ai working successfully");
})
const port =process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on the port : ${port}`);
})