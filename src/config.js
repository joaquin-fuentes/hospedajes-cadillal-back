/* Este fragmento de código está escrito en JavaScript y utiliza el paquete `dotenv` para cargar
variables de entorno desde un archivo `.env` en `process.env`. */
import "dotenv/config";

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hospedajescadillal_db";
