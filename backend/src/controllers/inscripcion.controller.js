"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const InscripcionService = require("../services/inscripcion.service");
const EmprendedorService = require("../services/emprendedor.service");
const InscripcionSchema = require("../schema/inscripcion.schema");
const ProductosService = require("../services/productos.service");
const { handleError } = require("../utils/errorHandler");

<<<<<<< HEAD
async function getInscripcionesSummary(req, res) {
  try {
    const [inscripciones, errorInscripciones] = await InscripcionService.getInscripcionesSummary();
    if (errorInscripciones) return respondError(req, res, 404, errorInscripciones);
=======
async function getInscripciones(req, res) {
  try {
    const [inscripciones, errorInscripciones] =
      await InscripcionService.getInscripciones();
    if (errorInscripciones)
      return respondError(req, res, 404, errorInscripciones);
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f

    inscripciones.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, inscripciones);
  } catch (error) {
<<<<<<< HEAD
    handleError(error, "inscripcion.controller -> getInscripcionesSummary");
=======
    handleError(error, "inscripcion.controller -> getInscripciones");
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
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
<<<<<<< HEAD
    respondError(req, res, 500, error.message);
=======
    respondError(req, res, 400, error.message);
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
  }
}

async function createInscripcion(req, res) {
  try {
    const { body } = req;
<<<<<<< HEAD

    const { error: bodyError } = InscripcionSchema.inscripcionBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [inscripcion, errorInscripcion] = await InscripcionService.createInscripcion(body);

    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);
    if (!inscripcion) {
      return respondError(req, res, 500, "No se creó la inscripción");
    }
    
    respondSuccess(req, res, 201, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> createInscripcion");
    respondError(req, res, 500, error.message);
=======
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
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
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
<<<<<<< HEAD
    respondError(req, res, 500, error.message);
=======
    respondError(req, res, 400, error.message);
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
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

<<<<<<< HEAD
    respondSuccess(
      req,
      res,
      200,
      "Inscripción eliminada satisfactoriamente",
      inscripcion,
    );
  } catch (error) {
    handleError(error, "inscripcion.controller -> deleteInscripcion");
    respondError(req, res, 500, error.message);
=======
    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> deleteInscripcion");
    respondError(req, res, 400, error.message);
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
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
<<<<<<< HEAD
      updatedInscripcion = await InscripcionService.updateInscripcionEstado(
=======
      updatedInscripcion = await InscripcionService.updatedInscripcion(
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
        inscripcionId,
        estado,
      );
    } else if (estado === "Rechazado") {
      // Agregar un comentario si se proporciona uno
      if (comentario) {
<<<<<<< HEAD
        updatedInscripcion = await InscripcionService.updateInscripcionEstado(
=======
        updatedInscripcion = await InscripcionService.updateInscripcionComentario(
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
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
<<<<<<< HEAD
  getInscripcionesSummary,
=======
  getInscripciones,
>>>>>>> 5b2d593b8b0514cc54aa6b3e5a8f8bca997d1e0f
  getInscripcionById,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
  reviewInscripcion,
};
