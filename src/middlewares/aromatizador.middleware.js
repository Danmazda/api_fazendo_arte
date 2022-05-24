import mongoose from 'mongoose';

class AromatizadorMiddleware{
  async verifyId(req, res, next){
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(422).send("Invalid ID!");
    }
    next();
  }
  async verifyBody(req, res, next){
      const {fragrance,
      description,
      image,
      price} = req.body;
      if(!fragrance || !description || !image || !price){
        return res.status(400).send("Missing attributes!");
      }
      next();
  }
}
const aromatizadorMiddleware= new AromatizadorMiddleware;
export default aromatizadorMiddleware;