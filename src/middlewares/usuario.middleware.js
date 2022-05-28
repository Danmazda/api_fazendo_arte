import mongoose from "mongoose";

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
}
const usuarioMiddleware = new UsuarioMiddleware();
export default usuarioMiddleware;
