const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el email']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña']
    },
    alias: {
        type: String,
        required: [true, 'Por favor ingresa el alias']
    },
    expediente: {
        type: String,
        required: [true, 'Por favor ingresa el expediente']
    },
    // id_actor: {
    //     type: Schema.Types.String,
    //     ref: 'Actors',
    //     required: [true, 'Ingresar el id del actor']
    // },
    estado: {
        type: Boolean,
        default: true
    }

});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('User', userSchema);