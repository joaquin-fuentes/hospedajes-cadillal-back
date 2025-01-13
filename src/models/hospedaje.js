import { Schema, model } from "mongoose";

const hospedajeSchema = new Schema({
  nombre: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  descripcion: {
    type: String,
    minLength: 10,
    maxLength: 500,
    required: true,
  },
  capacidadMin: {
    type: Number,
    min: 1,
    required: true,
  },
  capacidadMax: {
    type: Number,
    min: 1,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["Cabaña", "Departamento", "Casa", "Hostel"],
    required: true,
  },
  piscina: {
    type: Boolean,
    required: true,
  },
  wifi: {
    type: Boolean,
    required: true,
  },
  ubicacion: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  nombreDuenio: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  telefono: {
    type: String,
    match: /^[0-9]{7,15}$/, // Expresión regular para validar números de teléfono (7 a 15 dígitos)
    required: true,
  },
  correo: {
    type: String,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // Expresión regular para validar formato de email
    required: true,
  },
  fechaRegistro: {
    type: Date,
    required: true,
  },
  fechaUltimoPago: {
    type: Date,
    required: true,
  },
  montoPago: {
    type: Number,
    min: 0,
    required: true,
  },
  estadoPago: {
    type: String,
    enum: ["Pagado", "Pendiente"],
    required: true,
  },
  activo: {
    type: Boolean,
    required: true,
  },
  precioPorPersona: {
    type: Number,
    min: 0,
    required: true,
  },
  promociones: {
    type: Boolean,
    required: true,
  },
  imagenes: {
    type: [String], // Lista de URLs de imágenes
    validate: {
      validator: (arr) => arr.length > 0, // Asegurarse de que haya al menos 1 imagen
      message: "Debe proporcionar al menos una imagen",
    },
  },
});

const Hospedaje = model("hospedaje", hospedajeSchema);

export default Hospedaje;
