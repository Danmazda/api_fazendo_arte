import UsuarioModel from "../models/usuario.model.js";
class UsuarioService {
  async getAll() {
    const usuarios = await UsuarioModel.find();
    return usuarios;
  }
  async create(body) {
    try {
      const res = await UsuarioModel.create(body);
      return res;
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
}
const usuarioService = new UsuarioService();
export default usuarioService;
