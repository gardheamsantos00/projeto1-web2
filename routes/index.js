const express = require('express');

const router = express.Router();

// import model ref
const mongoose = require('mongoose');
require("../models/Orientacao");
const Orientacao = mongoose.model("orientacoes");

router.get('/' , (req, res)=>{
    res.render("admin/index");
    //res.send("testeaaaaaaa");
});

router.get('/orientacoes', (req, res)=>{

    Orientacao.find().sort({date: 'desc'}).then( (orientacoes) => {

        res.render("admin/orientacao", { orientacoes: orientacoes});
    }).catch( (error) =>{
        req.flash("error_msg", "Houve um erro ao listar as orientações");
        res.redirect("/auth");
    });
});

router.get('/orientacoes/add', (req, res)=>{
    res.render("admin/addorientacao");
});

router.post('/orientacoes/nova', (req, res)=>{
    
    var erros = [];

    //valida se o nome vier vazio null undefine
    if(!req.body.nome || 
        req.body.nome == null || 
        typeof req.body.nome == undefined){

        erros.push({texto: "Nome inválido!"});
    }
    
    if(req.body.nome.length < 2){
        erros.push({texto : "Nome deve possuir mais que 2 caracters"});
    }

    if(erros.length > 0 ){
        res.render("admin/addorientacao", { erros : erros })
    }else{

        //cria a orientacao no bd
        const novaOrientacao = {
            nome : req.body.nome
        }
    
        new Orientacao(novaOrientacao).save().then( ()=>{
            req.flash("success_msg" , "Orientação salva com sucesso!")
            res.redirect("/auth/orientacoes");
            console.log("orientacao salva");
        }).catch( (error)=>{
            req.flash("error_msg" , "Error ao tentar salvar orientação.")
            res.redirect("/auth");
            console.log("erro ao salvar orientacao : " + error);
        });

    }
    
    
});




//exportar o arquivo
module.exports = router;