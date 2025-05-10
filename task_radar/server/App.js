import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import authRouter from "./routes/authRou.js";
import userRouter from "./routes/userRou.js";
import adminRouter from "./routes/adminRou.js";
import projectRoutes from "./routes/projectRou.js"
import taskRoutes from "./routes/taskRou.js"


//routes declaration
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

export {app}