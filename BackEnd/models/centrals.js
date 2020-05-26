const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let centralSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre de la central']
    },
    alias: {
        type: String,
        required: [true, 'Por favor ingresa el alias']
    },
    siglas: {
        type: String,
        required: [true, 'Por favor ingresa las siglas']
    },
    direccion: {
        type: String,
        required: [true, 'Por favor ingresa la direccion']
    },
    latitud: {
        type: String,
        required: [true, 'Por favor ingresa latitud']
    },
    longitud: {
        type: String,
        required: [true, 'Por favor ingresa longitud']
    },
    criticity: {
        type: String,
        required: [true, 'Por favor ingresa criticity']
    },
    estado: {
        type: Boolean,
        default: true
    }

});

centralSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('Central', centralSchema);