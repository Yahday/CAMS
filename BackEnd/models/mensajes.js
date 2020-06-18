const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let Schema = mongoose.Schema;

let mensajeSchema = new Schema({
    usuario_envio: {
        type: String
    },
    usuario_recibo: {
        type: String,
    },
    fecha_hora: {
        type: Date,
    },
    mensaje: {
        type: String,
    },
    status: {
        type: String,
    },

    //campo para definir status en la bd
    estado: {
        type: Boolean,
        default: true
    }

});


//crea el id autoincrementable 
mensajeSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

mensajeSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Mensaje', mensajeSchema);