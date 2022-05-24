import { Router } from "express";
import aromatizadorController from '../controllers/aromatizador.controller.js';
import aromatizadorMiddleware from '../middlewares/aromatizador.middleware.js';
const aromatizadorRouter = Router();
aromatizadorRouter.get('/all', aromatizadorController.getAll);
aromatizadorRouter.get('/id/:id', aromatizadorMiddleware.verifyId, aromatizadorController.getById);
aromatizadorRouter.post('/create', aromatizadorController.create);
export default aromatizadorRouter; 