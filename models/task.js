const mongoose = require('mongoose');
const {Schema} = mongoose;

const TasksSchema = new Schema({
    no_control:{type: String, required: true},
    no_orden:{type: String, required: true},
    fecha:{type: String, required: true},
    no_proce:{type: String, required: true},
    fecha_limite:{type: String, required: true},
    no_solicitud_com:{type:String, require:true},

    partido_pre:{type: String, required: true},
    uni_me:{type: String, required: true},
    canti_soli:{type: String, required: true},
    precio:{type: String, required: true},
    importe:{type: String, required: true},
    descrip:{type: String, required: true}
});

module.exports = mongoose.model('Task', TasksSchema);