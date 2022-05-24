import AromatizadorModel from "../models/aromatizador.model.js";
class AromatizadorService {
  async getAll() {
    const aromatizadores = await AromatizadorModel.find();
    return aromatizadores;
  }
  async create(body) {
    await AromatizadorModel.create({ ...body });
  }
  async getById(id) {
    const aromatizador = await AromatizadorModel.findById(id);
    return aromatizador;
  }
  async updateOne(id, body){
    const aromatizador = await AromatizadorModel.updateOne({_id: id}, body);
    return aromatizador;
  }
  async deleteOne(id){
    const aromatizador = await AromatizadorModel.deleteOne({_id:id});
    return aromatizador;
  }
}
const aromatizadorService = new AromatizadorService();
export default aromatizadorService;
