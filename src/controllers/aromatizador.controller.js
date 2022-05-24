import aromatizadorService from "../services/aromatizador.service.js";

class AromatizadorController {
  async getAll(req, res) {
    const aromatizadores = await aromatizadorService.getAll();
    res.send(aromatizadores);
  }
  async create(req, res) {
    await aromatizadorService.create(req.body);
    res.send("done");
  }
  async getById(req, res) {
    const { id } = req.params;
    const aromatizador = await aromatizadorService.getById(id);
    res.send(aromatizador);
  }
}
const aromatizadorController = new AromatizadorController();
export default aromatizadorController;
