const express = require('express');
const app = express();
const dotenv = require('dotenv');
    dotenv.config();  //se puede setear donde esta la carpeta que contiene el archivo .env
const path = require ('path');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set("view engine", "ejs"); // Configuración del motor de plantillas EJS

app.use(express.static(path.join(__dirname + '/public/views')));// carpeta donde se encuentran las vistas ejs

const session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
const options = require('./app/db/dbconfig')
let sessionStore = new MySQLStore(options);


app.use(session({ //setear variables de session
    secret:'secret',
    store: sessionStore,//esta se guarda en db
    resave:true,
    saveUninitialized: true
}))

require("./app/routes/auth.routes")(app);//utiliza los metods post que estan en la carpeta routes para signin, signup , signout
require("./app/routes/user.routes")(app);//una vez logeado vienen estos metods get para acceser a la inf dependendiendo de si es admin user
require("./app/routes/db.routes")(app);//una ves logeado se habilitan estas rutas para ver la db

app.listen(3000,(req,res)=>{
    console.log("Server running in http://localhost:3000");
});
