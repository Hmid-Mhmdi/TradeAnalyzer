"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)();
let totalProfitPercentage = 0.0;
let totalProfit = 0.0;
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: "*",
}));
// Default
app.get("/updatePercentage/:id", (req, res) => {
    totalProfitPercentage = parseFloat(req.params.id);
    res.status(201).json({ message: totalProfitPercentage });
});
app.get("/updateDollar/:id", (req, res) => {
    totalProfit = parseFloat(req.params.id);
    res.status(201).json({ message: totalProfit });
});
app.get("/getLastValues", (req, res) => {
    res.status(201).json({ totalProfitPercentage, totalProfit });
});
// User Route
app.use("/api/auth", AuthRoutes_1.default);
// Middleware
app.use(ErrorMiddleware_1.notFound);
app.use(ErrorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
//# sourceMappingURL=index.js.map