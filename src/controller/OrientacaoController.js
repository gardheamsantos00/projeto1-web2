let express = require('express'),
    http = require('http'),
    path = require('path'),
    ProfessorDAO = require('../model/Professor'),
    OrientacaoDAO = require('../model/Orientacao'),
    app = express();

    app.set('view', path.join(__dirname, 'src/view'));
    app.set('view engine', 'hbs');

    app.get('/list', (req,res) =>{
        ProfessorDAO.find().then(
            res.render('home' {professors: professors});
        );
    });

    http.createServer(app).listen(5000);