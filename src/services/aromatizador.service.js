import AromatizadorModel from "../models/aromatizador.model.js";
class AromatizadorService {
  async getAll() {
    const aromatizadores =  await AromatizadorModel.find();
    console.log("aro:", aromatizadores);
    return aromatizadores;
  }
  async create(body){
    await AromatizadorModel.create({...body});
  }
  async getById(id){
     return AromatizadorModel.findById(id);
  }
}
const aromatizadorService = new AromatizadorService;
export default aromatizadorService;