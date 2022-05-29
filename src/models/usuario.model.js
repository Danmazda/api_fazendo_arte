import mongoose from "mongoose";
const { Schema, model } = mongoose;
const CarrinhoSchema = new Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Aromatizador" },
  quantity: { type: Number },
});
const UsuarioSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    cart: [CarrinhoSchema],
    adm: { type: Boolean, required: true },
  },
  { versionKey: false }
);
const UsuarioModel = model("Usuario", UsuarioSchema);
export default UsuarioModel;
