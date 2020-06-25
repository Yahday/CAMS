const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let activitiesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre de la actividad']
    },
    tasks: [{
        name: {
            type: String 
        },
        criticity: {
            type: String 
        }
    }]
});

module.exports = mongoose.model('Activities', activitiesSchema);