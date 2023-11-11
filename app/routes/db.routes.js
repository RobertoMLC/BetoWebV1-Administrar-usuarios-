
const path = require('path');
const{connectDB} = require('../db/db')
 const connection =  connectDB();
const express = require('express');
//const { Connection } = require('mysql2/typings/mysql/lib/Connection');
// const { error } = require('console');
const app = express();

module.exports = function(app){


    app.get( "*", async (req,res) => {
        res.render(path.join(__dirname + '../../../public/views/notFound'))
    })

    app.put('/db/userAdmin', async(req,res) =>{
        const getId = req.body.id
        const getUserID = 'select id from `user` where id =?';
        try{
            connection.query(getUserID,)
        }catch(error){
            throw error;
        }}
    )}

    //     const getAll = 'SELECT * FROM `prototype-user`.user '
    //     const connection = await connectDB();
    //     try{
    //         connection.query(getAll,(error,list)=>{
    //             if(error){
    //                 throw error
    //             }else{
    //               //  console.log(list);
    //                 res.render(path.join(__dirname + '../../../public/views/authUser'));
    //             }
    //         })
    //     }catch(err){
    //         console.log(err)
    //     }finally{
    //         connection.end((err) => {
    //             if (err) {
    //                  console.log(err)
    //             }else{
    //                 console.log('Desconectado exitosamente')
    //                 return
    //             }})

    //     }
    // })}
