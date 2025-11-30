import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();

const app =  express();


// middleware
app.use(cors({
    origin:"http://localhost:5173" || "http://localhost:5174"
}))
app.use(express.json()); // this middleware will parse JSON body
app.use(rateLimiter);

// app.use((req,res,next)=>{   // Custom middleware  
//     console.log(`Requested method ${req.method} & Req URL ${req.url}`);
//     next();
// })

app.use("/api/notes",notesRoutes);

connectDB().then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
    console.log("App is working...")
})
})
