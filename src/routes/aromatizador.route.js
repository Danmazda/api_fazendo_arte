import { Router } from "express";
import aromatizadorController from "../controllers/aromatizador.controller.js";
import aromatizadorMiddleware from "../middlewares/aromatizador.middleware.js";
const aromatizadorRouter = Router();
aromatizadorRouter.get("/all", aromatizadorController.getAll);
aromatizadorRouter.get(
  "/id/:id",
  aromatizadorMiddleware.verifyId,
  aromatizadorController.getById
);
aromatizadorRouter.post(
  "/create",
  aromatizadorMiddleware.verifyBody,
  aromatizadorController.create
);
aromatizadorRouter.put(
  "/update/:id",
  aromatizadorMiddleware.verifyId,
  aromatizadorMiddleware.verifyBody,
  aromatizadorController.updateOne
);
aromatizadorRouter.delete(
  "/delete/:id",
  aromatizadorMiddleware.verifyId,
  aromatizadorController.deleteOne
);

export default aromatizadorRouter;
