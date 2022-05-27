import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import aromatizadorRouter from "./routes/aromatizador.route.js";
import usuarioRouter from "./routes/usuario.route.js";
import dotenv from "dotenv";
import swagger from "./swagger.js";
import { serve, setup } from "swagger-ui-express";
dotenv.config();
const { connect } = mongoose;
const app = express();
app.use(cors());
app.use(serve);
app.get("/", setup(swagger));
app.use(express.json());
app.use("/aromatizador", aromatizadorRouter);
app.use("/usuario", usuarioRouter);
export const connectToDb = async () => {
  try {
    await connect(`${process.env.MONGOURL}`, {
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
