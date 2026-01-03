import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyroute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ FIXED CORS ✅
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ROUTES ✅ FIX THIS ALSO
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyroute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const port = process.env.PORT || 7000;

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
