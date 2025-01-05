/**
 * El código anterior contiene controladores para la autenticación de usuarios, la recuperación de
 * usuarios, la creación de usuarios, la eliminación de usuarios y la edición de usuarios en una
 * aplicación Node.js que utiliza MongoDB.
 * @param req - El parámetro `req` en su código representa el objeto de solicitud en Express.js.
 * Contiene información sobre la solicitud HTTP que activó la función, como los encabezados, el cuerpo,
 * los parámetros y más de la solicitud.
 * @param res - El parámetro `res` en su código representa el objeto de respuesta en Express.js. Se
 * utiliza para enviar una respuesta al cliente que realiza la solicitud. Puede utilizar métodos como
 * `res.status()` para establecer el código de estado HTTP de la respuesta, `res.json()` para enviar
 * una respuesta JSON,
 * @returns El código proporcionado incluye varias funciones de controlador para la autenticación y
 * administración de usuarios en una aplicación Node.js usando Express y Mongoose. A continuación se
 * muestra un resumen de las funciones:
 */
// import generarJWT from "../helpers/token-sign";
import generarJWT from "../helpers/token-sign";
import Usuario from "../models/usuario";

//LOGIN
export const login = async (req, res) => {
  try {
    //verificar si existe un nombreUsuario como el recibido
    const { nombreUsuario, password } = req.body;

    //verificar si el nombreUsuario ya existe
    let usuario = await Usuario.findOne({ nombreUsuario }); //devulve un null
    if (!usuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "Correo o password invalido - correo",
      });
    }
    // si no es valido el password
    if (password !== usuario.password) {
      return res.status(400).json({
        mensaje: "Correo o password invalido - password",
      });
    }

    // generar el token
    const token = await generarJWT(usuario._id, usuario.nombreUsuario);

    //responder que el usuario es correcto
    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id,
      nombre: usuario.nombreUsuario,
      token: token,
    });
    // res.send(usuario)
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "usuario o contraseña invalido",
    });
  }
};

//Controlador para obtener usuarios

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar los usuarios de la base de datos",
    });
  }
};

//Controlador para obtener un solo usuario

export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar el usuario de la base de datos",
    });
  }
};

// Controlador para crear un usuario

export const crearUsuario = async (req, res) => {
  try {
    const usuarioNuevo = new Usuario(req.body);
    await usuarioNuevo.save();
    res.status(201).json({
      mensaje: "El usuario fue creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al crear el usuario",
    });
  }
};

// controlador para eliminar un usuario

export const borrarUsuario = async (req, res) => {
  try {
    //obtener el id y luego solicitar a moongoose el borrar
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.status(200).json({
      mensaje: "EL usuario fue eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al eliminar el usuario",
    });
  }
};

// controlador para editar un usuario

export const editarUsuario = async (req, res) => {
  try {
    //obtener el id y luego solicitar a moongoose el editar
    const { id } = req.params;
    await Usuario.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      mensaje: "El usuario fue actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al editar el usaurio",
    });
  }
};
