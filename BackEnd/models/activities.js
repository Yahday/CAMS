const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

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

activitiesSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Activities', activitiesSchema);