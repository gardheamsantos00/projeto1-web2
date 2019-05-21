const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require("../models/Usuario");

const Ususario = mongoose.model("usuarios");




router.get("/registro", (req,res) => {
    res.render("usuarios/registro");
});



router.post("/registro", (req,res) =>{
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"});
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"});
    }

    if(req.body.senha.length < 4){
        erros.push({texto: "Senha deve ter mais de 4 caracters"});
    }

    if(erros.length > 0){
        res.render("usuarios/registro", {erros: erros});
    }else{
        Ususario.findOne({email: req.body.email}).then( (usuario)=>{

            if(usuario){
                req.flash("error_msg", "email já cadastrado");
                res.redirect("/usuarios/registro");
            }else{
                const novoUsuario = new Ususario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                });

                bcrypt.genSalt(10, (erro,salt) =>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash("error_msg", "Erro ao salvar senha");
                            res.redirect("/");
                        }

                        novoUsuario.senha = hash;

                        novoUsuario.save().then(()=>{
                            req.flash("success_msg", "Usuário criado com sucesso");
                            res.redirect("/");
                        }).catch( (error)=>{
                            req.flash("error_msg", "Erro ao criar usuário");
                            res.redirect("/usuarios/registro");
                        });
                    });
                });
            }


        }).catch( (erro)=> {
            req.flash("error_msg" , "Houve um erro no login");
            res.redirect("/");
        });

    }




});







module.exports = router;