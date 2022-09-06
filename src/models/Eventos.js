const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const eventoSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date },
  fechaFormat: { type: String },
  creado: { type: String },
  url: { type: String, required: true },
  hora: { type: String },
  breveDescrip: { type: String },
  vigente: { type: Boolean, default: true },
  recordatorio: { type: Boolean, default: false },
  tipo: { type: String, default: "eventos" },
  subs: [
    {
      nombre: { type: String },
      apellido: { type: String },
      email: { type: String}
    },
  ],
},{
  timestamps: true
});

eventoSchema.plugin(mongoosePaginate);

module.exports = model("Eventos", eventoSchema);
