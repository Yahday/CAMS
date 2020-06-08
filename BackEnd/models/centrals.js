const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

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


    //campo para definir status en la bd
    estado: {
        type: Boolean,
        default: true
    }

});

//crea el id autoincrementable 
centralSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

centralSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('Central', centralSchema);