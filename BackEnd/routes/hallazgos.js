const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let Schema = mongoose.Schema;

let hallazgoSchema = new Schema({
    Fecha: {
        type: Date,
        required: true
    },
    Folio: {
        type: String,
        required: true
    },
    CentroManto: {
        type: String,
        required: true
    },
    codigoActor: {
        type: Schema.Types.String,
        ref: 'Actor',
        required: true
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

hallazgoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Hallazgo', hallazgoSchema);