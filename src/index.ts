import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";
import AuthRoutes from "./routes/AuthRoutes";

const app: Application = express();

dotenv.config();

connectDB();

let totalProfitPercentage=0.0;
let totalProfit=0.0;


app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: "*",
}));

// Default
app.get("/updateValues/:percentage/:dollar", (req: Request, res: Response) => {
  totalProfitPercentage=parseFloat(req.params.percentage);
  totalProfit=parseFloat(req.params.dollar);
  res.status(201).json({  totalProfitPercentage ,totalProfit});
});




app.get("/getLastValues", (req: Request, res: Response) => {
  res.status(201).json({  totalProfitPercentage ,totalProfit});
});

// User Route
app.use("/api/auth", AuthRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));
