import { Router } from "express";
import usuarioController from "../controllers/usuario.controller.js";
import usuarioMiddleware from "../middlewares/usuario.middleware.js";
const usuarioRouter = Router();
usuarioRouter.get("/all", usuarioController.getAll);
usuarioRouter.get(
  "/id/:id",
  usuarioMiddleware.verifyId,
  usuarioController.getById
);
usuarioRouter.post(
  "/create",
  usuarioMiddleware.verifyJwt,
  usuarioMiddleware.verifyBody,
  usuarioController.create
);
usuarioRouter.put(
  "/update/:id",
  usuarioMiddleware.verifySameUser,
  usuarioMiddleware.verifyId,
  usuarioMiddleware.verifyBody,
  usuarioController.updateOne
);
usuarioRouter.delete(
  "/delete/:id",
  usuarioMiddleware.verifyJwt,
  usuarioMiddleware.verifyId,
  usuarioController.deleteOne
);
usuarioRouter.post(
  "/signin",
  usuarioMiddleware.verifyBodySignIn,
  usuarioController.signIn
);

export default usuarioRouter;
