"use strict";
const mongoose = require("mongoose");

//Cada emprendimiento tiene un arreglo de productos.

const productosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    maxLenght: 100,
  },
  categoría: {
    type: String,
    required: true,
    maxLenght: 255,
  },
  fotografia: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
    maxLenght: 255,
  },
  stock: {
    type: Number,
    required: true,
    min: 1,
    max: 300,
  },
  emprendedorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emprendedor",
    required: true,
  },
});

const Productos = mongoose.model("Productos", productosSchema);

module.exports = Productos;
