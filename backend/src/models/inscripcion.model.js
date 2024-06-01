"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  },
  {
    versionKey: false,
  },
);

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

module.exports = Inscripcion;
