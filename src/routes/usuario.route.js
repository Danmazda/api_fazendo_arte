import { Router } from "express";
import usuarioController from "../controllers/usuario.controller.js";
const usuarioRouter = Router();
usuarioRouter.get("/all", usuarioController.getAll);
usuarioRouter.get("/id/:id", usuarioController.getById);
usuarioRouter.post("/create", usuarioController.create);
usuarioRouter.put("/update/:id", usuarioController.updateOne);
usuarioRouter.delete("/delete/:id", usuarioController.deleteOne);

export default usuarioRouter;
