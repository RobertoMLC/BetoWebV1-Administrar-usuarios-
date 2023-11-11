
const path = require('path');
const { connectDB } = require('../db/db')
// const connection = await connectDB();


module.exports = function (app) {
    app.get('/register', (req, res) => {
        res.render(path.join(__dirname + '../../../public/views/register'));
    });

    app.get('/login', (req, res) => {
        res.render(path.join(__dirname + '../../../public/views/login'));
    });
    app.get('/db', async (rea, res) => {
        const connection = await connectDB();
        try {
            let dbRes = connection.query("SELECT * FROM `prototype-user`.user");
            console.log(dbRes);
            return;
        } catch (error) {
            console.log(error);
        } finally {
            connection.end((err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Desconectado exitosamente')
                };

                return;
            })
        }
    });

    app.get('/', (req, res) => {
        if (req.session.loggedin) {
            res.render(path.join(__dirname + '../../../public/views/'), {
                login: true,
                name: req.session.name,
                rol: req.session.rol
            });
        } else {
            res.render(path.join(__dirname + '../../../public/views/'), {
                login: false,
                name: 'Debe iniciar sesion'
            })
        }
    })
    app.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    })
    app.get('/db/user', async (req, res) => {
        const getAll = 'SELECT * FROM `prototype-user`.user '
        const connection = await connectDB();
        try {
            if (req.session.loggedin) {
                connection.query(getAll, (error, list) => {
                    if (error) {
                        throw error
                    } else {
                        let = rol = [];
                        let nombre = [];
                        let usuario = [];
                        let pass =[];
                        list.forEach((element) => {
                            nombre.push(element.name);
                            rol.push(element.rol);
                            usuario.push(element.user);
                            pass.push(element.pass)
                        });
                        console.log(nombre);
                        res.render(path.join(__dirname + '../../../public/views/showDb'), {
                            name: nombre,
                            user: usuario,
                            pass: pass,
                            rol: rol

                        });
                    }
                })
            } else {
                res.render(path.join(__dirname + '../../../public/views/'), {
                    login: false,
                    name: 'Debe iniciar sesion'
                })
            }
        } catch (err) {
            console.log(err)
        } finally {
            connection.end((err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Desconectado exitosamente')
                    return
                }
            })

        }
    })
    app.get('/db/userAdmin', async (req, res) => {
        const getAll = 'SELECT * FROM `prototype-user`.user '
        const connection = await connectDB();
        try {
            if (req.session.loggedin) {
                connection.query(getAll, (error, list) => {
                    if (error) {
                        throw error
                    } else {
                        let = rol = [];
                        let nombre = [];
                        let usuario = [];
                        let pass =[];
                        list.forEach((element) => {
                            nombre.push(element.name);
                            rol.push(element.rol);
                            usuario.push(element.user);
                            pass.push(element.pass)
                        });
                        console.log(nombre);
                        res.render(path.join(__dirname + '../../../public/views/AdminDb'), {
                            name: nombre,
                            user: usuario,
                            pass: pass,
                            rol: rol

                        });
                    }
                })
            } else {
                res.render(path.join(__dirname + '../../../public/views/'), {
                    login: false,
                    name: 'Debe iniciar sesion'
                })
            }
        } catch (err) {
            console.log(err)
        } finally {
            connection.end((err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Desconectado exitosamente')
                    return
                }
            })

        }
    }
    )
    // app.get('*', async (req,res)=>{
    //     try{
    //         res.json('No existe la dir.')

    //     }catch(err){

    //     }
    // })
}

