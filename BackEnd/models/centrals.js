const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let centralSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    alias: {
        type: String,
        required: [true, 'Por favor ingresa el alias']
    },
    neighborhood: {
        type: String,
        required: [true, 'Por favor ingresa neighborhood']
    },
    between_streets: {
        type: String,
        required: [true, 'Por favor ingresa el between_streets']
    },
    street: {
        type: String,
        required: [true, 'Por favor ingresa street']
    },
    outdoor_number: {
        type: String,
        required: [true, 'Por favor ingresa outdoor_number']
    },
    interior_number: {
        type: String,
        required: [true, 'Por favor ingresa interior_number']
    },
    latitud: {
        type: String,
        required: [true, 'Por favor ingresa latitud']
    },
    cp: {
        type: String,
        required: [true, 'Por favor ingresa cp']
    },
    longitud: {
        type: String,
        required: [true, 'Por favor ingresa longitud']
    },
    criticity: {
        type: String,
        required: [true, 'Por favor ingresa criticity']
    },
    class: {
        type: String,
            required: [true, 'Por favor ingresa class']
    },
    acronym: {
        type: String,
        required: [true, 'Por favor ingresa acronym']
    },
    created_at: {
        type: String,
        required: [true, 'Por favor ingresa created_at']
    },
    updated_at: {
        type: String,
        required: [true, 'Por favor ingresa updated_at']
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