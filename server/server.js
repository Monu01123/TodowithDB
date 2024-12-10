import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import todo from "./routes/todo.routes.js";

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/",todo);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
