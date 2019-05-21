const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Professor = new Schema({
    nome: {
        type: String,
        required: true
    },
    especialidade: {
        type:String,
        required: true
    }

});

mongoose.model("professores", Professor);