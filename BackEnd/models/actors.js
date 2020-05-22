const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let actorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    activities: [{
        name: {
            type: String,
            required: [true, 'Por favor ingresa el nombre de la actividad']
        },
        created_at: {
            type: String,
            required: [true, 'Por favor ingresa el campo vacio']
        },
        updated_at: {
            type: String,
            required: [true, 'Por favor ingresa el campo vacio']
        }

    }],
    estado: {
        type: Boolean,
        default: true
    }

});

actorSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('Actor', actorSchema);