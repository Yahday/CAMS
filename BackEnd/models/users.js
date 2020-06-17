const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    alias: {
        type: String,
        required: [false, 'Por favor ingresa el alias']
    },
    expediente: {
        type: Number,
        required: [true, 'Por favor ingresa el número de expediente']
    },
    telefono: {
        type: Number,
        required: [true, 'Por favor ingresa el telefono']
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
    avatar: {
        type: String,
    },
    Status: {
        type: Boolean,
        default: true
    },
    area: [{
        codigoArea: {
            type: Schema.Types.ObjectId,
            ref: 'Area',
        }
    }],
    cm: [{
        codigoCM: {
            type: Schema.Types.String,
            ref: 'CM',
        }
    }],
    Permisos: [{
        id_permiso: {
            type: Schema.Types.ObjectId,
            ref: 'Permisos',
        }
    }]
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('User', userSchema);