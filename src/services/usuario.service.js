import UsuarioModel from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AromatizadorModel from "../models/aromatizador.model.js";
import mongoose from "mongoose";
dotenv.config();
class UsuarioService {
  async getAll() {
    const usuarios = await UsuarioModel.find();
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
    const usuario = await UsuarioModel.findById(id).populate({
      path: "cart",
      populate: { path: "product" },
    });
    return usuario;
  }
  async getByEmail(email) {
    const usuario = await UsuarioModel.findOne({ email }).populate({
      path: "cart",
      populate: { path: "product" },
    });
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
      if (!user) {
        throw new Error("User not found!");
      }
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const token = jwt.sign(
          { email: user.email, adm: user.adm },
          `${process.env.JWTKEY}`,
          { expiresIn: "2h" }
        );
        return { token, name: user.name, adm: user.adm, email: user.email };
      } else {
        throw new Error("Senha inválida");
      }
    } catch (e) {
      throw e;
    }
  }

  async addItemToCart(email, idProduct) {
    try {
      const user = await UsuarioModel.findOne({ email });
      const product = await AromatizadorModel.findById(idProduct);
      if (user.cart.length === 0) {
        user.cart.push({ product, quantity: 1 });
      } else {
        const index = user.cart.findIndex((p) => product._id.equals(p.product));
        if (index === -1) {
          user.cart.push({ product, quantity: 1 });
        } else {
          user.cart[index].quantity += 1;
        }
      }
      user.save();
      return "Saved";
    } catch (e) {
      return e.message;
    }
  }

  async deleteItemFromCart(email, idProduct) {
    try {
      const user = await UsuarioModel.findOne({ email });
      if (!user) {
        throw new Error("User not found!");
      }
      const product = await AromatizadorModel.findById(idProduct);
      const index = user.cart.findIndex((p) => product._id.equals(p.product));
      console.log(index);
      user.cart.splice(index, 1);
      user.save();
      return "Saved";
    } catch (e) {
      return e.message;
    }
  }

  async deleteOneItemFromCart(email, idProduct) {
    try {
      const user = await UsuarioModel.findOne({ email });
      if (!user) {
        throw new Error("User not found!");
      }
      const product = await AromatizadorModel.findById(idProduct);
      const index = user.cart.findIndex((p) => product._id.equals(p.product));
      if (index === -1) {
        return "Not found";
      }
      user.cart[index].quantity -= 1;
      if (user.cart[index].quantity <= 0) {
        user.cart.splice(index, 1);
      }
      user.save();
      return "Saved";
    } catch (e) {
      return e.message;
    }
  }

  async clearCart(idUser) {
    try {
      const user = await UsuarioModel.findById(idUser);
      user.cart = [];
      user.save();
      return "Saved";
    } catch (e) {
      return e.message;
    }
  }
}
const usuarioService = new UsuarioService();
export default usuarioService;
