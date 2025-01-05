/* Este fragmento de código define un esquema Mongoose para un usuario (usuario) en una base de datos
MongoDB. A continuación se muestra un desglose de lo que hace cada parte del código: */
import { Schema, model } from "mongoose"

const usuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        minLength: 2,
        maxLength: 50,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    apellido: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    rol: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    estado: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    fechaNacimiento: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        minLength: 2,
        maxLength: 50,
        unique: true,
        required: true
    },
    //para usar expresiones regulares se usa la propiedad "match"
    password: {
        type: String,
        required: true
    },
    // categoria: {
    //     type: String,
    //     required:true
    // },
})

const Usuario = model("usuario", usuarioSchema)

export default Usuario