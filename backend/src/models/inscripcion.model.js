"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD
// usuario envía formulario de inscripción. Se crea un registro en la colección inscripciones.

const inscripcionSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    emprendedorId: {
      type: Schema.ObjectId,
      ref: "Emprendedor",
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "aprobada", "rechazada"],
      default: "sin inscripciones",
      required: true,
    },
    comentario: {
      type: String,
    },
    fechaInscripcion: {
      type: Date,
      default: Date.now(),
      required: true,
    },
=======
const inscripcionSchema = new mongoose.Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
  },
  {
    versionKey: false,
  },
<<<<<<< HEAD
);
=======
  productosId: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Productos",
      },
    ],
    required: true,
    minItems: 1,
    maxItems: 10,
  },
  ayudantesId: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Ayudantes",
      },
    ],
    required: true,
    default: [],
    maxItems: 3,
  },
  estado: {
    type: String,
    enum: ["pendiente", "aprobada", "rechazada", "sin inscripciones"],
    default: "sin inscripciones",
    required: true,
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  comentario: {
    type: String,
    default: "",
  },
});
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

module.exports = Inscripcion;
