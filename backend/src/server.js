import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173" || "http://localhost:5174",
    })
  );
}

app.use(express.json()); // this middleware will parse JSON body
app.use(rateLimiter);

// app.use((req,res,next)=>{   // Custom middleware
//     console.log(`Requested method ${req.method} & Req URL ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontrnd", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("App is working...");
  });
});
