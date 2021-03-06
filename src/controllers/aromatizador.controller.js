import aromatizadorService from "../services/aromatizador.service.js";

class AromatizadorController {
  async getAll(req, res) {
    const aromatizadores = await aromatizadorService.getAll();
    if (aromatizadores.length === 0) {
      return res.status(404).send({ error: "No fragrance in the database." });
    }
    res.send(aromatizadores);
  }
  async create(req, res) {
    const response = await aromatizadorService.create(req.body);
    if (response.fragrance) {
      res.status(201).send(response);
    } else {
      res.status(400).send({ message: "Error creating." });
    }
  }
  async getById(req, res) {
    const { id } = req.params;
    const aromatizador = await aromatizadorService.getById(id);
    if (!aromatizador) {
      return res.status(404).send({ error: "Fragrance not found." });
    }
    res.send(aromatizador);
  }
  async updateOne(req, res) {
    const { id } = req.params;
    try {
      const aromatizador = await aromatizadorService.updateOne(id, req.body);
      res.status(200).send({ message: "updated" });
    } catch (e) {
      res.status(400).send({ error: `${e.message}` });
    }
  }
  async deleteOne(req, res) {
    const { id } = req.params;
    const aromatizador = await aromatizadorService.deleteOne(id);
    if (aromatizador.deletedCount === 1) {
      return res.status(200).send({ message: "Deleted" });
    } else {
      return res.status(404).send({ message: "Can't find id" });
    }
  }
}
const aromatizadorController = new AromatizadorController();
export default aromatizadorController;
