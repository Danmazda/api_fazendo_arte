import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import aromatizadorRouter from "./routes/aromatizador.route.js";
const { connect } = mongoose;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/aromatizador", aromatizadorRouter);
export const connectToDb = async () => {
  try {
    await connect("mongodb://localhost:27017/helena_db", {useNewUrlParser: true,
    useUnifiedTopology: true});
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Error connecting to mongo");
    console.log(e.message);
  }
};
app.get("/", (req, res) => {
  res.send("Aromatizador API");
});
export default app;
