import { Router } from "express";
import aromatizadorController from "../controllers/aromatizador.controller.js";
import aromatizadorMiddleware from "../middlewares/aromatizador.middleware.js";
import usuarioMiddleware from "../middlewares/usuario.middleware.js";
const aromatizadorRouter = Router();
aromatizadorRouter.get("/all", aromatizadorController.getAll);
aromatizadorRouter.get(
  "/id/:id",
  aromatizadorMiddleware.verifyId,
  aromatizadorController.getById
);
aromatizadorRouter.post(
  "/create",
  usuarioMiddleware.verifyJwt,
  aromatizadorMiddleware.verifyBody,
  aromatizadorController.create
);
aromatizadorRouter.put(
  "/update/:id",
  usuarioMiddleware.verifyJwt,
  aromatizadorMiddleware.verifyId,
  aromatizadorMiddleware.verifyBody,
  aromatizadorController.updateOne
);
aromatizadorRouter.delete(
  "/delete/:id",
  usuarioMiddleware.verifyJwt,
  aromatizadorMiddleware.verifyId,
  aromatizadorController.deleteOne
);

export default aromatizadorRouter;
