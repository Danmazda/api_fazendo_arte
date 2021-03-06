import usuarioService from "../services/usuario.service.js";

class UsuarioController {
  async getAll(req, res) {
    const usuarios = await usuarioService.getAll();
    if (usuarios.length === 0) {
      return res.status(404).send({ error: "No user in the database." });
    }
    res.send(usuarios);
  }
  async create(req, res) {
    try {
      console.log(req.body);
      const response = await usuarioService.create(req.body);
      return res.status(201).send(response);
    } catch (e) {
      res.status(400).send({ message: `${e.message}` });
    }
  }
  async getById(req, res) {
    const { id } = req.params;
    const usuario = await usuarioService.getById(id);
    if (!usuario) {
      return res.status(404).send({ error: "User not found." });
    }
    res.send(usuario);
  }

  async getByEmail(req, res) {
    const { email } = req.body;
    const usuario = await usuarioService.getByEmail(email);
    if (!usuario) {
      return res.status(404).send({ error: "User not found." });
    }
    res.send(usuario);
  }
  async updateOne(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.updateOne(id, req.body);
      res.status(200).send({ message: " User updated" });
    } catch (e) {
      res.status(400).send({ error: `${e.message}` });
    }
  }
  async deleteOne(req, res) {
    const { id } = req.params;
    const usuario = await usuarioService.deleteOne(id);
    if (usuario.deletedCount === 1) {
      return res.status(200).send({ message: "User deleted" });
    } else {
      return res.status(404).send({ message: "Can't find user id" });
    }
  }

  async signIn(req, res) {
    try {
      const obj = await usuarioService.signIn(req.body);
      return res.status(200).send(obj);
    } catch (e) {
      res.status(400).send({ error: `${e.message}` });
    }
  }

  async addItemToCart(req, res) {
    const product = req.body.product;
    const email = req.body.email;
    const message = await usuarioService.addItemToCart(email, product);
    res.status(200).send({ message });
  }

  async deleteItemFromCart(req, res) {
    const email = req.body.email;
    const idProduct = req.body.product;
    console.log(email);
    const message = await usuarioService.deleteItemFromCart(email, idProduct);
    res.status(200).send({ message });
  }

  async deleteOneItemFromCart(req, res) {
    const email = req.body.email;
    const idProduct = req.body.product;
    const message = await usuarioService.deleteOneItemFromCart(
      email,
      idProduct
    );
    res.status(200).send({ message });
  }

  async clearCart(req, res) {
    const idUser = req.params.id;
    const message = await usuarioService.clearCart(idUser);
    res.status(200).send({ message });
  }
}
const usuarioController = new UsuarioController();
export default usuarioController;
