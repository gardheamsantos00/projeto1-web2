const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Orientacao = new Schema({
    nome: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now()
    },
    
   // actions: [{ type: Schema.Types.ObjectId, ref: 'Professor'}]

});

mongoose.model("orientacoes", Orientacao);