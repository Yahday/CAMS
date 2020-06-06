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
            message: `Area ${activity.name} guardada`
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

ActivityCtrl.getTasks = async (req, res) => { //Ver Tareas de una Actividad
    const id = req.params.id;
    await Activities.findById(id)
        .exec((err, actividad) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                Actividad: actividad.name,
                Tareas: actividad.tasks
            });
        });
};

ActivityCtrl.addTask = async (req, res) => { //Agregar una Tarea
    const id = req.params.id;
    const name = req.body.name;
    const criticity = req.body.criticity;
    const newTask = {name: name, criticity: criticity};
    await Activities.findByIdAndUpdate(id, {$push: {tasks: newTask}})
        .exec((err) => {
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

ActivityCtrl.editTask = async (req, res) => {      //Editar Tarea
    const id = req.params.id;
    const name = req.body.name;
    const criticity = req.body.criticity;
        await Activities.aggregate([
            {$project: 
                {"tasks": {
                    $filter: {
                        input: "$tasks",
                        as: "task",
                        cond: { 
                            $eq: [ "$$task.name", name ]
                        }
                    }
                }} 
            }
        ])
        .exec((err, task) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
            return res.status(200).json({
                ok: true,
                task
            })}
        })
};

ActivityCtrl.deleteTask = async (req, res) => { //Eliminar Tarea
    const id = req.params.id;
    const task = req.params.task
    await Activities.findByIdAndUpdate(id, {$pull: {tasks: {name: task}} }, (err) => {
        if (err) {
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

router.get('/activities/:id/tasks', ActivityCtrl.getTasks);//Ver Tareas de una Actividad
router.post('/activities/:id/tasks', ActivityCtrl.addTask);//Nueva Tarea

router.get('/activities/:id/tasks/:task', ActivityCtrl.editTask);//Editar Tarea
router.delete('/activities/:id/tasks/:task', ActivityCtrl.deleteTask);//Eliminar Tarea

module.exports = router;