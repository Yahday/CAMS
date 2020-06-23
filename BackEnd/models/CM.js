const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uniqueValidator = require('mongoose-unique-validator');
autoIncrement.initialize(mongoose);

//CENTRO MANTENIMIENTO

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
    codigoCentral: [{
        type: Schema.Types.Number,
        ref: 'Central',
    }],
    codigoArea: [{
        type: Schema.Types.Number,
        ref: 'Area',
    }],

    //campo para definir status en la bd
    estado: {
        type: Boolean,
        default: true
    }

});


//crea el id autoincrementable 
cmSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

cmSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('CM', cmSchema);