import aromatizadorService from "../services/aromatizador.service.js";

class AromatizadorController {
  async getAll(req, res) {
    const aromatizadores = await aromatizadorService.getAll();
    if (aromatizadores.length === 0) {
      return res.status(404).send("No fragrance in the database.");
    }
    res.send(aromatizadores);
  }
  async create(req, res) {
    await aromatizadorService.create(req.body);
    res.status(201).send("Fragrance created.");
  }
  async getById(req, res) {
    const { id } = req.params;
    const aromatizador = await aromatizadorService.getById(id);
    if (!aromatizador) {
      return res.status(404).send("Fragrance not found");
    }
    res.send(aromatizador);
  }
  async updateOne(req, res) {
    const { id } = req.params;
    const aromatizador = await aromatizadorService.updateOne(id, req.body);
    res.status(200).send("updated.");
  }
  async deleteOne(req, res) {
    const { id } = req.params;
    const aromatizador = await aromatizadorService.deleteOne(id);
    if (aromatizador.deletedCount === 1) {
      return res.status(200).send("deleted.");
    } else{
      return res.status(404).send("Failed to delete.");
    }
  }
}
const aromatizadorController = new AromatizadorController();
export default aromatizadorController;
