import mongoose from "mongoose";
import usuarioService from "../services/usuario.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class UsuarioMiddleware {
  async verifyId(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).send({ error: "Invalid Id!" });
    }
    next();
  }
  async verifyBody(req, res, next) {
    const { name, email, password } = req.body;
    let { adm } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ error: "Missing Attributes!" });
    }
    if (!adm) {
      adm = false;
    }
    req.body = {
      name,
      email,
      password,
      adm,
    };
    next();
  }
  async verifyBodySignIn(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Missing Attributes!" });
    }
    next();
  }
  async verifyJwt(req, res, next) {
    let { authorization } = req.headers;
    try {
      authorization = authorization.split(" ");
      const token = authorization[1];
      const verified = jwt.verify(token, `${process.env.JWTKEY}`);
      if (verified.adm === true) {
        next();
      } else {
        throw new Error("User not allowed");
      }
    } catch (e) {
      return res.status(404).send({ error: "Autorização necessária" });
    }
  }
  async verifySameUser(req, res, next) {
    let { authorization } = req.headers;
    try {
      authorization = authorization.split(" ");
      const token = authorization[1];
      const verified = jwt.verify(token, `${process.env.JWTKEY}`);
      const user = await usuarioService.getById(req.params.id);
      if (verified.email === user.email) {
        next();
      } else {
        throw new Error("Not the same user");
      }
    } catch (e) {
      console.log(e.message);
      return res.status(404).send({ error: "Operação não autorizada" });
    }
  }
}
const usuarioMiddleware = new UsuarioMiddleware();
export default usuarioMiddleware;
