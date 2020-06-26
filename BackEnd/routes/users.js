const { Router } = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const fs = require('fs');

const User = require('../models/users');
const Areas = require('../models/areas');
const CM = require('../models/CM');
const router = Router();

const UserCtrl = {};

UserCtrl.getUsers = async(req, res) => {

    await User.find({ Status: true })
        .populate('area.codigoArea', 'name')
        .populate('cm.codigoCM', 'name')
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: users.length,
                users
            });
        });
};

UserCtrl.getUser = async(req, res) => {
    const id = req.params.id
    await User.findById(id)
        .populate('area.codigoArea', 'name')
        .populate('cm.codigoCM', 'name')
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: user.length,
                user
            });
        });
};

UserCtrl.addUser = async(req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        alias: body.alias,
        expediente: body.expediente,
        telefono: body.telefono,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        avatar: body.avatar,
        cm: { codigoCM: body.cm }
    });

    await user.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
};

UserCtrl.addImg = async(req, res) => {
    let body = req.body;
    var Img = req.body.base64Image.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile('imagenes/usuarios/' + body.alias + '.jpg', Img, 'base64', function(err) {
        console.log(err); // writes out file without error, but it's not a valid image
    });

    let urlImagen = '/imagenes/usuarios/' + body.alias + '.jpg';

    let user = new User({
        name: body.name,
        alias: body.alias,
        expediente: body.expediente,
        telefono: body.telefono,
        email: body.email,
        avatar: urlImagen,
        password: bcrypt.hashSync(body.password, 10),
        area: body.area,
        cm: body.cm,
        Permisos: body.Permisos
    });

    await user.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
};

UserCtrl.editUser = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'alias', 'expediente', 'telefono', 'email', 'Status']);
    await User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });

    });
};

UserCtrl.editPass = async(req, res) => {
    let id = req.params.id;
    let pass = bcrypt.hashSync(req.body.password, 10);
    await User.findByIdAndUpdate(id, { password: pass }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });

    });
};

UserCtrl.addArea = async(req, res) => {
    let id = req.params.id;
    const name = req.body.name;
    await Areas.findOne({ name: name }) //Busca el Área que se va a agregar al Usuario
        .exec(async(err, area) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                await User.findByIdAndUpdate(id, { $push: { area: { codigoArea: area._id } } }); //Agrega la Actividad buscada en el 
                return res.status(200).json({ //Array de Actividades del Area
                    ok: true,
                    message: `Area ${name} agregada al Usuario`
                })
            }
        })
};

UserCtrl.addCM = async(req, res) => {
    let id = req.params.id;
    const name = req.body.name;
    await CM.findOne({ name: name }) //Busca el CM que se va a agregar al Usuario
        .exec(async(err, cm) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                await User.findByIdAndUpdate(id, { $push: { cm: { codigoCM: cm._id } } }); //Agrega la Actividad buscada en el 
                return res.status(200).json({ //Array de Actividades del Area
                    ok: true,
                    message: `Usuario agregado al Centro de Mantenimiento: ${name}`
                })
            }
        })
};

UserCtrl.deleteArea = async(req, res) => {
    let id = req.params.id;
    let area = req.params.area
    await User.findByIdAndUpdate(id, { $pull: { area: { codigoArea: area } } }) //Quita la Area del Usuario
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Area eliminada del Usuario`
                })
            }
        })
};

UserCtrl.deleteCM = async(req, res) => {
    let id = req.params.id;
    let cm = req.params.cm
    await User.findByIdAndUpdate(id, { $pull: { cm: { codigoCM: cm } } }) //Quita la Area del Usuario
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Usuario eliminado del Centro de Mantenimiento`
                })
            }
        })
};

UserCtrl.deleteUser = async(req, res) => {
    let id = req.params.id;
    await User.findByIdAndUpdate(id, { Status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
};

router.get('/user', UserCtrl.getUsers); //Ver todos los Usuarios
router.post('/user', UserCtrl.addUser); //Nuevo Usuario

router.get('/user/:id', UserCtrl.getUser); //Buscar un Usuario
router.put('/user/:id', UserCtrl.editUser); //Editar Usuario
router.delete('/user/:id', UserCtrl.deleteUser); //Eliminar Usuario

router.put('/user/:id/pass', UserCtrl.editPass); //Editar constraseña

router.put('/user/:id/img', UserCtrl.addImg); //Agregar Imagen del Usuario

router.put('/user/:id/cm', UserCtrl.addCM); //Agregar Usuario a un CM
router.put('/user/:id/area', UserCtrl.addArea); //Agregar Areas al Usuario

router.put('/user/:id/cm/:cm', UserCtrl.deleteCM); //Eliminar usuario del CM
router.put('/user/:id/area/:area', UserCtrl.deleteArea); //Eliminar Area del Usuario

module.exports = router;