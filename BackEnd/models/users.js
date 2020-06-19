const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
const Areas = require('./areas');
const CM = require('./CM');

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
            type: Schema.Types.Number,
            ref: Areas,   
        }    
    }],
    cm: [{
        codigoCM: {
            type: Schema.Types.Number,
            ref: CM 
        }        
    }],
    Permisos: [{
        id_permiso: {
            type: Schema.Types.ObjectId,
            ref: 'Permisos',
        }
    }]
});


//crea el id autoincrementable 
userSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('User', userSchema);