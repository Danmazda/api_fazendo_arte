import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import aromatizadorRouter from "./routes/aromatizador.route.js";
import swagger from "./swagger.js";
import { serve, setup } from "swagger-ui-express";
const { connect } = mongoose;
const app = express();
app.use(cors());
app.use(serve);
app.get("/", setup(swagger));
app.use(express.json());
app.use("/aromatizador", aromatizadorRouter);
export const connectToDb = async () => {
  try {
    await connect("mongodb://localhost:27017/helena_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Error connecting to mongo");
    console.log(e.message);
  }
};
export default app;
