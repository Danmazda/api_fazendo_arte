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
  "/email",
  usuarioMiddleware.verifySameUser,
  usuarioController.getByEmail
);
usuarioRouter.post(
  "/create",
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
usuarioRouter.post(
  "/additem",
  usuarioController.addItemToCart
);
usuarioRouter.delete(
  "/deleteoneitem",
  usuarioController.deleteOneItemFromCart
);
usuarioRouter.delete(
  "/deleteitem/:id",
  usuarioMiddleware.verifyId,
  usuarioController.deleteItemFromCart
);
usuarioRouter.delete(
  "/clearcart/:id",
  usuarioMiddleware.verifyId,
  usuarioController.clearCart
);

export default usuarioRouter;
