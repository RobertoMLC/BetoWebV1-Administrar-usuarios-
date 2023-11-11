const bcryptjs = require('bcryptjs');

const path = require('path');

const { connectDB } = require('../db/db')



module.exports = function (app) {
    app.post('/register', async (req, res) => {
        const connection = await connectDB();
        const user = req.body.user;
        const name = req.body.name;
        const rol = req.body.rol;
        const pass = req.body.pass;
        let passwordHash = await bcryptjs.hash(pass, 8);

        try {
            connection.query("INSERT INTO `prototype-user`.user SET ?", { user: user, name: name, rol: rol, pass: passwordHash }, async (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Usuario registrado correctamente')
                    res.render(path.join(__dirname + '../../../public/views/register'), {
                        alert: true,
                        alertTitle: "Registration",
                        alertMessage: "¡Sucessfull!",
                        alertIcon: "success",
                        showConfirmButton: false,
                        time: 1500,
                        ruta: ''
                    })
                }
            })

        } catch (err) {
            console.error(err)
        } finally {
            connection.end((err) => {
                if (err) {
                     console.log(err)
                }else{
                    console.log('Desconectado exitosamente')
                };

                return;
            })
        }
    });
    app.post('/auth', async (req, res) => {
        const connection = await connectDB();
        try {
            const user = req.body.user;
            const pass = req.body.pass;
            console.log(user);
            console.log(pass);
            // let passwordHash = await bcryptjs.hash(pass,8);
            if (user && pass) {
                connection.query('SELECT * FROM `prototype-user`.user WHERE user = ?', [user], async (error, results) => {
                    if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                        res.render(path.join(__dirname + '../../../public/views/login'), {
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "Usuario y/o password incorrecto",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: false,
                            ruta: "login"
                        });
                    } else {
                        console.log('Usuario acaba de logearce');

                        req.session.loggedin = true;
                        req.session.name = results[0].name;
                        req.session.rol = results[0].rol;
                        res.render(path.join(__dirname + '../../../public/views/login'), {
                            alert: true,
                            alertTitle: "Conexion exitosa!",
                            alertMessage: "Login Correcto",
                            alertIcon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                            ruta: "/"
                        })
                    }
                })

            } else {
                res.render(path.join(__dirname + '../../../public/views/login'), {
                    alert: true,
                    alertTitle: "Advertencia",
                    alertMessage: "Por favor ingrese un usuario y/o contraseña",
                    alertIcon: "warning",
                    showConfirmButton: false,
                    timer: 2000,
                    ruta: "login"
                })
            };
        } catch (err) {
            console.log(err)
        } finally {
            connection.end((err) => {
                if (err) {
                     console.log(err)
                }else{
                    console.log('Desconectado exitosamente')
                };

                return;
            })
        }

    })
};
