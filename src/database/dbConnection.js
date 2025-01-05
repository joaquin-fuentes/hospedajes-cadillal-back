/* Este fragmento de código utiliza la biblioteca `mongoose` para conectarse a una base de datos
MongoDB. Aquí hay un desglose de lo que hace cada parte: */
import { connect } from "mongoose";
import { MONGODB_URI } from "../config";

connect(MONGODB_URI, { family: 4 })
  .then((resp) => console.log(`DB conectada en ${resp.connection.name}`))
  .catch((error) => console.log(error));
