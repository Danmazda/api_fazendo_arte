import mongoose from 'mongoose';
const {Schema, model} = mongoose;
const AromatizadorSchema = new Schema({
  fragrance: {type: String, required: true, unique:true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  price: {type: Number, required: true}
}, {versionKey: false});
const AromatizadorModel = model("Aromatizador", AromatizadorSchema);
export default AromatizadorModel;