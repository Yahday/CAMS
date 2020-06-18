const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let Schema = mongoose.Schema;

let centralSchema = new Schema({
    name: {
        type: String,
    },
    alias: {
        type: String,
    },
    siglas: {
        type: String,
    },
    tipoCentral: [{
        tipo: {
            type: String
        }
    }],
    ubicacion: {
        type: String,
    },
    direccion: {
        type: String
    },
    latitud: {
        type: String,
    },
    longitud: {
        type: String,
    },
    criticity: {
        type: String,
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