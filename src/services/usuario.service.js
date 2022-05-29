import UsuarioModel from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AromatizadorModel from "../models/aromatizador.model.js";
import mongoose from "mongoose";
dotenv.config();
class UsuarioService {
  async getAll() {
    const usuarios = await UsuarioModel.find().populate({
      path: "cart",
      select: "product",
    });
    return usuarios;
  }
  async create(body) {
    try {
      let { password } = body;
      password = await bcrypt.hash(password, 2);
      const mongoResponse = await UsuarioModel.create({ ...body, password });
      return mongoResponse;
    } catch (e) {
      throw e;
    }
  }
  async getById(id) {
    const usuario = await UsuarioModel.findById(id);
    return usuario;
  }
  async updateOne(id, body) {
    try {
      const usuario = await UsuarioModel.updateOne({ _id: id }, body);
      return usuario;
    } catch (e) {
      throw e;
    }
  }
  async deleteOne(id) {
    try {
      const usuario = await UsuarioModel.deleteOne({ _id: id });
      return usuario;
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  }
  async signIn(body) {
    const { email, password } = body;
    try {
      const user = await UsuarioModel.findOne({ email });
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        return jwt.sign(
          { email: user.email, adm: user.adm },
          `${process.env.JWTKEY}`,
          { expiresIn: "2h" }
        );
      } else {
        throw new Error("Senha inválida");
      }
    } catch (e) {
      throw e;
    }
  }

  async addItemToCart(idUser, idProduct) {
    try {
      const user = await UsuarioModel.findById(idUser);
      const product = await AromatizadorModel.findById(idProduct);
      user.cart.push({ product, quantity: 1 });
      user.save();
      return "Saved";
    } catch (error) {
      return e.message;
    }
  }

  async deleteItemFromCart(idUser, idProduct) {
    try {
      const user = await UsuarioModel.findById(idUser);
      const product = await AromatizadorModel.findById(idProduct);

      const index = user.cart.findIndex((p) => product._id.equals(p.product));
      console.log(index);
      user.cart.splice(index, 1);
      user.save();
      return "Saved";
    } catch (error) {
      return e.message;
    }
  }

  async clearCart(idUser) {
    try {
      const user = await UsuarioModel.findById(idUser);
      user.cart = [];
      user.save();
      return "Saved";
    } catch (error) {
      return e.message;
    }
  }
}
const usuarioService = new UsuarioService();
export default usuarioService;
