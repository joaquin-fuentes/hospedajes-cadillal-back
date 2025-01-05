/**
 * El código anterior contiene funciones de controlador para manejar operaciones CRUD en hospedajes en
 * una aplicación Node.js usando Express y Mongoose.
 * @param req - El parámetro `req` en su código representa el objeto de solicitud en Express.js.
 * Contiene información sobre la solicitud HTTP, como los encabezados de la solicitud, los parámetros,
 * el cuerpo, los parámetros de consulta, etc.
 * @param res - El parámetro `res` en los fragmentos de código que proporcionó representa el objeto de
 * respuesta en Express.js. Se utiliza para enviar una respuesta al cliente que realiza la solicitud
 * HTTP. El objeto de respuesta (`res`) tiene métodos como `res.status()` para establecer el código de
 * estado HTTP de la respuesta, `
 */
import { validationResult } from "express-validator";
import Hospedaje from "../models/hospedaje";

//Controlador para obtener hospedajes

export const obtenerHospedajes = async (req, res) => {
  try {
    const hospedajes = await Hospedaje.find();
    res.status(200).json(hospedajes);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar los hospedajes de la base de datos",
    });
  }
};
//Controlador para obtener un solo hospedaje

export const obtenerHospedaje = async (req, res) => {
  try {
    const { id } = req.params;
    const hospedaje = await Hospedaje.findById(id);
    res.status(200).json(hospedaje);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar el hospedaje de la base de datos",
    });
  }
};

// Controlador para crear un hospedaje

export const crearHospedaje = async (req, res) => {
  try {
    //trabajar con el resultado de la validacion de express-validator
    const errors = validationResult(req);
    // errors.isEmpty() // true: esta vacio, false: hay error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    const hospedajeNuevo = new Hospedaje(req.body);
    await hospedajeNuevo.save();
    res.status(201).json({
      mensaje: "El hospedaje fue creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al crear el hospedaje",
    });
  }
};

// controlador para eliminar un hospedaje

export const borrarHospedaje = async (req, res) => {
  try {
    //obtener el id y luego solicitar a moongoose el borrar
    const { id } = req.params;
    await Hospedaje.findByIdAndDelete(id);
    res.status(200).json({
      mensaje: "El hospedaje fue eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al eliminar el hospedaje",
    });
  }
};

// controlador para editar un hospedaje

export const editarHospedaje = async (req, res) => {
  try {
    //obtener el id y luego solicitar a moongoose el editar
    const { id } = req.params;
    await Hospedaje.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      mensaje: "El hospedaje fue actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al editar el hospedaje",
    });
  }
};
