const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let Schema = mongoose.Schema;

let permisoSchema = new Schema({
    clave: {
        type: Number

    },
    descripcion: {
        type: String,

    },

    //campo para definir status en la bd
    estado: {
        type: Boolean,
        default: true
    }

});


//crea el id autoincrementable 
permisoSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

permisoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Permiso', permisoSchema);