import AromatizadorModel from "../models/aromatizador.model.js";
class AromatizadorService {
  async getAll() {
    const aromatizadores = await AromatizadorModel.find();
    return aromatizadores;
  }
  async create(body) {
    try {
      const res = await AromatizadorModel.create({ ...body });
      return res;
    } catch (e) {
      return e.message;
    }
  }
  async getById(id) {
    const aromatizador = await AromatizadorModel.findById(id);
    return aromatizador;
  }
  async updateOne(id, body) {
    try {
      const aromatizador = await AromatizadorModel.updateOne({ _id: id }, body);
      return aromatizador;
    } catch (e) {
      throw e;
    }
  }
  async deleteOne(id) {
    try {
      const aromatizador = await AromatizadorModel.deleteOne({ _id: id });
      return aromatizador;
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  }
}
const aromatizadorService = new AromatizadorService();
export default aromatizadorService;
