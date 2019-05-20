// imports
const express = require('express');
const handbrs = require('express-handlebars');
const bodypar = require("body-parser");

const app = express();
const mongoose = require('mongoose');

const indexRoutes = require("./routes/index");

const path = require('path');

const session = require('express-session');
const flash = require('connect-flash');


//configs
const PORT = 3333;

//bodyparser config
app.use(bodypar.urlencoded({extended:true})); 
app.use(bodypar.json());

//handlebars config
app.engine('handlebars', handbrs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//public configs
app.use(express.static(path.join(__dirname, "public")));

//session config
app.use(session({
    secret: "web2app1",
    resave:true,
    saveUninitialized:true
}));

app.use(flash());

//middleware
app.use( (req,res,next)=> {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});


//mongoose
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/web2-app1",{ useNewUrlParser: true }).then( ()=>{
    console.log("conectado ao mongodb");
}).catch( (error) => {
    console.log("erro ao conectar-se" + error );
})

//rotas 
//prefixo do grupo de rotas /auth
app.use('/auth' , indexRoutes );

//iniciar servidor
app.listen(PORT, ()=> {
    console.log("servidor rodando na porta " + PORT);
});
