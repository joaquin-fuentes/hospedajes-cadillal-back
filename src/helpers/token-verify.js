/**
 * La función `validarJWT` se utiliza para validar un token web JSON (JWT) recibido en un encabezado de
 * solicitud y extraer el ID de usuario y el nombre de la carga útil del token si es válido.
 * @param req - El parámetro `req` en la función `validarJWT` representa el objeto de solicitud en
 * Express.js. Contiene información sobre la solicitud HTTP que se está realizando, como encabezados,
 * parámetros, cuerpo, etc. En este caso, la función intenta extraer un token JWT de la solicitud.
 * @param res - El parámetro `res` en la función `validarJWT` es el objeto de respuesta que se enviará
 * al cliente que realiza la solicitud. Se utiliza para enviar respuestas HTTP al cliente, como códigos
 * de estado, datos JSON o hospedajes de error. En el fragmento de código proporcionado, `
 * @param next - El parámetro `siguiente` en la función `validarJWT` es una función de devolución de
 * llamada que se utiliza para pasar el control a la siguiente función de middleware en la pila. Cuando
 * llama a `next()` dentro de la función `validarJWT`, le dice a Express que pase a la siguiente
 * función de middleware. Esto es
 * @returns La función `validarJWT` se exporta como una función de middleware para validar tokens web
 * JSON (JWT) en una aplicación Node.js. Comprueba si hay un token presente en los encabezados de la
 * solicitud, verifica el token usando la clave secreta proporcionada (`process.env.SECRET_JWT`) y
 * extrae el ID de usuario (`uid`) y el nombre (`nombre`) del token. carga útil si la verificación es
 * exitosa
 */
import jwt from "jsonwebtoken";

const validarJWT = (req, res, next) => {
  //recibir token
  const token = req.header("x-token");
  if (!token) {
    //401 error en la autenticacion
    return res.status(401).json({
      hospedaje: "No hay token en la peticion",
    });
  }
  // si el token existe
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    req.id = payload.uid;
    req.nombre = payload.nombre;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      hospedaje: "El token no es valido",
    });
  }
};
export default validarJWT;
