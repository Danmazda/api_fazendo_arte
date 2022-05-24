import mongoose from 'mongoose';

class AromatizadorMiddleware{
  async verifyId(req, res, next){
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(422).send("Invalid ID!");
    }
    next();
  }
}
const aromatizadorMiddleware= new AromatizadorMiddleware;
export default aromatizadorMiddleware;