"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const InscripcionService = require("../services/inscripcion.service");
const InscripcionSchema = require("../schema/inscripcion.schema");
const { handleError } = require("../utils/errorHandler");

async function getInscripciones(req, res) {
  try {
    const [inscripciones, errorInscripciones] =
      await InscripcionService.getInscripciones();
    if (errorInscripciones)
      return respondError(req, res, 404, errorInscripciones);

    inscripciones.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, inscripciones);
  } catch (error) {
    handleError(error, "inscripcion.controller -> getInscripciones");
    respondError(req, res, 400, error.message);
  }
}

async function getInscripcionById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      InscripcionSchema.inscripcionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [inscripcion, errorInscripcion] =
      await InscripcionService.getInscripcionById(params.id);
    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);

    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> getInscripcionById");
    respondError(req, res, 400, error.message);
  }
}

async function createInscripcion(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } =
      InscripcionSchema.inscripcionBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [inscripcion, errorInscripcion] =
      await InscripcionService.createInscripcion(body);
    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);

    respondSuccess(req, res, 201, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> createInscripcion");
    respondError(req, res, 400, error.message);
  }
}

async function updateInscripcion(req, res) {
  try {
    const { body, params } = req;
    const { error: bodyError } =
      InscripcionSchema.inscripcionBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const { error: paramsError } =
      InscripcionSchema.inscripcionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [inscripcion, errorInscripcion] =
      await InscripcionService.updateInscripcion(params.id, body);
    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);

    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> updateInscripcion");
    respondError(req, res, 400, error.message);
  }
}

async function deleteInscripcion(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      InscripcionSchema.inscripcionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [inscripcion, errorInscripcion] =
      await InscripcionService.deleteInscripcion(params.id);
    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);

    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> deleteInscripcion");
    respondError(req, res, 400, error.message);
  }
}

async function reviewInscripcion(req, res) {
  try {
    const { estado, comentario, inscripcionId } = req.body;

    // Validar inscripcionId
    const { error: idError } = InscripcionSchema.inscripcionIdSchema.validate({
      id: inscripcionId,
    });
    if (idError) return respondError(req, res, 400, idError.message);

    let updatedInscripcion;
    if (estado === "Aprobado") {
      // Actualizar el estado a "Aprobado"
      updatedInscripcion = await InscripcionService.updatedInscripcion(
        inscripcionId,
        estado,
      );
    } else if (estado === "Rechazado") {
      // Agregar un comentario si se proporciona uno
      if (comentario) {
        updatedInscripcion = await InscripcionService.updateInscripcionComentario(
          inscripcionId,
          estado,
          comentario,
        );
      } else {
        updatedInscripcion = await InscripcionService.updateInscripcionEstado(
          inscripcionId,
          estado,
        );
      }
    } else {
      throw new Error("El estado debe ser 'Aprobado' o 'Rechazado'.");
    }

    // Respondes con éxito y retornas la inscripción actualizada
    respondSuccess(req, res, 200, updatedInscripcion);
  } catch (error) {
    // Manejar cualquier error que ocurra
    handleError(error, "inscripcion.controller -> reviewInscripcion");
    respondError(req, res, 400, error.message);
  }
}

module.exports = {
  getInscripciones,
  getInscripcionById,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
  reviewInscripcion,
};
