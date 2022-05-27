import mongoose from 'mongoose';
const {Schema, model} = mongoose;
const UsuarioSchema = new Schema({
  email: {type: String, required: true, unique:true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  adm: {type: Boolean, required: true}
}, {versionKey: false});
const UsuarioModel = model("Usuario", UsuarioSchema);
export default UsuarioModel;