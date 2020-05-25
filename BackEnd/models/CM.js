const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

//CENTRAL MANTENIMIENTO

let Schema = mongoose.Schema;

let cmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre']
    },
    ubicacion: {
        type: String,
        required: [true, 'Por favor ingresa la ubicacion']
    },
    codigoCentral: {
        type: Schema.Types.String,
        ref: 'Central',
        required: [true, 'Ingresar el id de central']
    },
    codigoActor: {
        type: Schema.Types.String,
        ref: 'Actor',
        required: [true, 'Ingresar el id del actor']
    },
    // gerencia: {
    //     type: String,
    //     required: [true, 'Por favor ingresa la gerencia']
    // },
    estado: {
        type: Boolean,
        default: true
    }

});

// cmSchema.plugin(autoIncrement.plugin, {
//     model: '_id',
//     field: '_id',
//     startAt: 1,
//     incrementBy: 1
// });

cmSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('CM', cmSchema);