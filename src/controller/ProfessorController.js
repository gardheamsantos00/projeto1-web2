let express = require('express'),
    http = require('http'),
    path = require('path'),
    OrientacaoDAO = require('../model/Orientacao'),
    app = express();

    app.set('view', path.join(__dirname, 'src/view'));
    app.set('view engine', 'hbs');

    app.get('/list', (req,res) =>{
        OrientacaoDAO.find().then(
            res.render('home' {orentacao: orentacaos});
        );
    });

    http.createServer(app).listen(5000);