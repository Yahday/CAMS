const { Router } = require('express');
const _ = require('underscore');
const router = Router();

const Activities = require('../models/activities');

//Controller
const ActivityCtrl = {};

ActivityCtrl.getActivities = async (req, res) => { //Ver todas las Actividades
    await Activities.find()
    .exec((err, activities) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            count: activities.length,
            activities
        })
    })
};

ActivityCtrl.getActivity = async (req, res) => { //Buscar una Actividad
    const id = req.params.id;
    await Activities.findById(id)
    .exec((err, activity) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            activity
        })
    });
};

ActivityCtrl.createActivity = async (req, res) => { //Nueva actividad
    const name = req.body.name;
    const newActivity = new Activities({name: name});
    await newActivity.save((err, activity) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            message: `Actividad ${activity.name} guardada`
        })
    });
};

ActivityCtrl.deleteActivity = async (req, res) => { //Eliminar Actividad
    const id = req.params.id;
    await Activities.findByIdAndDelete(id)
        .exec ((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({ 
                    ok: true,
                    message: `Actividad eliminada`
                });
            }
        });
};

ActivityCtrl.editActivity = async (req, res) => { //Editar Nombre de la Actividad
    const id = req.params.id;                               
    const name = req.body.name;
    await Activities.findByIdAndUpdate(id, {name: name})
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Actividad ${name} actualizada`
                })
            }    
        })
};

ActivityCtrl.addTask = async (req, res) => { //Agregar una Tarea
    const id = req.params.id; //id de Actividad
    const name = req.body.name; //Nombre de la Tarea
    const criticity = req.body.criticity; //Criticidad de la Tarea
    const newTask = {name: name, criticity: criticity}; //"Nueva tarea"
    await Activities.findByIdAndUpdate(id, {$push: {tasks: newTask}}) //En la Actividad seleccionada agregar  
        .exec((err) => {                                              //al Array tasks la "Nueva Tarea"
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Tarea ${name} agregada`
                })
            }
        })
};

ActivityCtrl.editTask = async (req, res) => {//Editar Tarea (se maneja como sustitucion)
    const id = req.params.id; //id de Actividad
    const oldTask = req.body.old; //Nombre de "Tarea a sustituir"
    const name = req.body.name; //Nombre nueva Tarea
    const criticity = req.body.criticity; //Criticidad nueva Tarea
    const newTask = {name: name, criticity: criticity}; //"Tarea Actualizada"
    try {
        await Activities.findByIdAndUpdate(id, {$pull: {tasks: {name: oldTask}} }) //Elimina "Tarea a sustituir"
        await Activities.findByIdAndUpdate(id, {$push: {tasks: newTask}}) //Agrega "Tarea Actualizada"
        return res.status(200).json({
            ok: true,
            message: `Tarea ${name} modificada`
        })
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
};

ActivityCtrl.deleteTask = async (req, res) => { //Eliminar Tarea
    const id = req.params.id; //id de Actividad
    const task = req.body.name //Nombre de la Tarea a Eliminar
    await Activities.findByIdAndUpdate(id, {$pull: {tasks: {name: task}} }, (err) => { //En la Actividad seleccionada busca en el Array 
        if (err) {                                                                     //tasks el nombre de la tarea y eliminala
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                message: `Tarea eliminada`
            })
        }
    });
};

//Sub-routes
router.get('/activities', ActivityCtrl.getActivities);//Ver Actividades
router.post('/activities', ActivityCtrl.createActivity);//Nueva Actividad

router.get('/activities/:id', ActivityCtrl.getActivity);//Ver una Actividad
router.put('/activities/:id', ActivityCtrl.editActivity);//Editar Nombre de la Actividad
router.delete('/activities/:id', ActivityCtrl.deleteActivity);//Eliminar Actividad

router.post('/activities/:id/tasks', ActivityCtrl.addTask);//Nueva Tarea
router.put('/activities/:id/tasks', ActivityCtrl.editTask);//Editar Tarea
router.delete('/activities/:id/tasks', ActivityCtrl.deleteTask);//Eliminar Tarea

module.exports = router;