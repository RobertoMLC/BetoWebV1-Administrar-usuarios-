
const dotenv = require('dotenv');
dotenv.config();

const mysqlClient = require('mysql');

async function connectDB() {
    try {
        const client =  mysqlClient.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        });
        console.log('Conectado a la base de datos');
        return client;
        }catch(err){
            console.log(err);
            return(null)
    }
    }

module.exports = {connectDB }
