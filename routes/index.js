const express = require('express');

const router = express.Router();

// import model ref
const mongoose = require('mongoose');
require("../models/Orientacao");
const Orientacao = mongoose.model("orientacoes");

require("../models/Professor");
const Professor = mongoose.model("professores");


var erros = [];

router.get('/' , (req, res)=>{
    res.render("admin/index");
    //res.send("testeaaaaaaa");
});


//LISTAR ORIENTAÇÃO --------------------------------------------------------------
router.get('/orientacoes', (req, res)=>{

    Orientacao.find().populate("orientador").sort({date: 'desc'}).then( (orientacoes) => {

        res.render("admin/orientacao", { orientacoes: orientacoes});
    }).catch( (error) =>{
        req.flash("error_msg", "Houve um erro ao listar as orientações");
        res.redirect("/auth");
    });
});

// RENDER PAGE FORM ORIENTACOES -----------------------------------------------------
router.get('/orientacoes/add', (req, res)=>{

    Professor.find().then( (professores) =>{

        res.render("admin/addorientacao", {professores: professores});

    }).catch( (error) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário");
        res.redirect("/auth");
    });
});


//CADASTRAR ORIENTAÇÃO -------------------------------------------------------
router.post('/orientacoes/nova', (req, res)=>{
    
        
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
            nome : req.body.nome,
            orientador : req.body.orientador
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

//Busca um orientacao pra EDIT  -------------------------------------------------------
router.get("/orientacoes/edit/:id", (req,res) => {

    Orientacao.findOne({_id:req.params.id}).then( (orientacao) =>{
        
        Professor.find().then((professores) =>{
            
            //passa pra view as orientações e professores da busca
            res.render("admin/editorientacao", 
            {orientacao:orientacao , professores: professores});
        
        }).catch( (error)=>{
            req.flash("error_msg", "Erro ao listar os professores")
        });

    }).catch( (error) => {
        req.flash("error_msg", "Esta orientação não existe");
        res.redirect("/auth/orientacoes");
    });
});


//Edita a orientacao e salva  ---------------------------------------------
router.post("/orientacao/edit", (req,res)=>{

    


    Orientacao.findOne({_id:req.body.id}).then( (orientacao) =>{

    //valida se o nome vier vazio null undefine
        if(!req.body.id || 
            req.body.id == null || 
            typeof req.body.id == undefined){

            erros.push({texto: "Id inválido!"});
        }
        
        if(req.body.nome.length < 2){
            erros.push({texto : "Edição do nome deve possuir mais que 2 caracters"});
        }

        if(erros.length > 0 ){
            res.render("admin/addorientacao", { erros : erros })
        }else{
            // falta as validações de campos , fazer depois!
        orientacao.nome = req.body.nome;
        orientacao.orientador = req.body.orientador;

        orientacao.save().then( ()=> {
            req.flash("success_msg" , "Orientação editada com sucesso");
            res.redirect("/auth/orientacoes");
        }).catch( (error)=>{
            req.flash("error_msg", "Houve um erro ao salvar a edição da orientação");
            res.redirect("/auth/orientacoes");
            console.log("error save edit" + error);
        });
        
        }
        

    }).catch( (error) => {
        req.flash("error_msg", "Error na edição de orientacao");
        res.redirect("/auth/orientacoes");
        console.log("find error save edit" + error);
    });
})

//DEL ORIENTAÇÃO ------------------------------------------
router.post("/orientacao/del" , (req,res) => {
    Orientacao.deleteOne({_id: req.body.id}).then( () => {
        req.flash("success_msg", "Orientacao deletada com sucesso!");
        res.redirect("/auth/orientacoes");
    }).catch( (error) => {
        req.flash("error_msg", "Houve um erro ao tentar deletar a orientação");
        res.redirect("/auth/orientacoes");
    });
});



//ROTAS PROFESSOR ------------------------------------------------------




// FIND NA LISTA DE PROFESSORES-----------------------------------------
router.get("/professores" , (req,res)=> {
    
    Professor.find().sort({nome: 'asc'}).then( (professores) => {

        res.render("admin/professores", { professores: professores});
        
    }).catch( (error) =>{
        req.flash("error_msg", "Houve um erro ao listar os professores");
        res.redirect("/auth");
    });
});



// ROTA QUE RENDERIZA A PAG DE FORM DE PROFESSOR ---------------------------------
router.get("/professores/add", (req,res)=>{
    res.render("admin/addprofessor");
});



// CAD DE PROFESSOR -------------------------------------------------------------
router.post("/professores/novo", (req,res) => {

        //cria a professor no bd
        const novoProfessor = {
            nome : req.body.nome,
            especialidade : req.body.especialidade
        }
    
        new Professor(novoProfessor).save().then( ()=>{
            req.flash("success_msg" , "Professor salvo com sucesso!")
            res.redirect("/auth/professores");
        }).catch( (error)=>{
            req.flash("error_msg" , "Error ao tentar salvar professor.")
            res.redirect("/auth");
            console.log(erro);
        });

});


//exportar o arquivo
module.exports = router;