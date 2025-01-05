/**
 * La función genera un token web JSON (JWT) con una carga útil que contiene el ID y el nombre del
 * usuario, firmado con una clave secreta y que caducará en 3 horas.
 * @param uid - El parámetro "uid" normalmente significa "ID de usuario", que es un identificador único
 * asignado a un usuario en un sistema. Se utiliza para distinguir a un usuario de otro y se utiliza
 * comúnmente con fines de autenticación y autorización.
 * @param nombre - El parámetro `nombre` en la función `generarJWT` representa el nombre del usuario
 * para quien se genera el token JWT. Es una de las piezas de información que se incluirá en la carga
 * útil del token JWT junto con el `uid` (ID de usuario). Esta información ayuda
 * @returns La función `generarJWT` devuelve una Promesa que se resuelve con un JSON Web Token (JWT)
 * generado usando la biblioteca `jsonwebtoken`. El JWT está firmado con una carga útil que contiene el
 * `uid` y el `nombre` proporcionados como argumentos de la función. El token tiene un tiempo de
 * vencimiento de 3 horas y está firmado utilizando la variable de entorno `SECRET_JWT`. Si el token es
 * exitoso
 */
import jwt from "jsonwebtoken";

const generarJWT = (uid, nombre) => {
  return new Promise((resolve, reject) => {
    //agregar los datos al payload

    const payload = { uid, nombre };
    //aqui firmamos el token)
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: "3h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        //si esta todo correcto
        resolve(token);
      }
    );
  });
};

export default generarJWT;
