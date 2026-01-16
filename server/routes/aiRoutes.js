// import express from 'express';
// import { GoogleGenerativeAI } from '@google/generative-ai';



// import dotenv from 'dotenv';
// dotenv.config();

// const router =express.Router();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
// const model = genAI.getGenerativeModel({model:"gemini-1.0-pro"});

// router.post('/ask',async(req,res)=>{
//     try{
//         const {prompt} = req.body;

//         const result = await model.generateContent(prompt);
//         const response = await result.response.text();
//         res.status(200).json({reply:response});

//     }catch(err){{
//         console.log("Error in gemini ai  : ",err);
//          res.status(500).json({ message: "Gemini Request Failed", err });
//     }}
// })

// export default router;

import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

// supported model for your SDK version
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });



router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await model.generateContent(prompt);
    const response =await result.response.text();

    res.json({ reply: response });
  } catch (error) {
    console.error("Error in gemini ai  :", error);
    res.status(500).json({ message: "Gemini Request Failed", error });
  }
});

export default router;
