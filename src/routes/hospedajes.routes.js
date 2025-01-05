/* Este código JavaScript configura un enrutador utilizando el marco Express para una aplicación de
hospedajería. Aquí hay un desglose de lo que hace cada parte: */
import { Router } from "express";
import {
  borrarHospedaje,
  crearHospedaje,
  editarHospedaje,
  obtenerHospedaje,
  obtenerHospedajes,
} from "../controllers/hospedajes.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/hospedajes")
  .get(obtenerHospedajes)
  .post(
    [
      check("nombreDuenio")
        .notEmpty()
        .withMessage("El nombreduenio es un dato obligatorio"),
    ],
    crearHospedaje
  );
router
  .route("/hospedajes/:id")
  .get(obtenerHospedaje)
  .delete(borrarHospedaje)
  .put(editarHospedaje);

export default router;
