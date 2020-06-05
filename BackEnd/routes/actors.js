const { Router } = require('express');
const _ = require('underscore');
const router = Router();

const Actors = require('../models/actors');
const Activities = require('../models/activities');
const Tasks = require('../models/tasks');

//Controller
const ActorCtrl = {};

ActorCtrl.getActors = async (req, res) => { //Ver Actores
    await Actors.find()
    .exec((err, actors) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            count: actors.length,
            actors
        })
    })
    
};

ActorCtrl.getActor = async (req, res) => { //Ver un Actor
    const id = req.params.id;
    await Actors.findById(id)
    .populate('activities')
    .exec((err, actor) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            actor
        })
    });
};

ActorCtrl.createActor = async (req, res) => { //Nuevo actor
    const name = req.body.name;
    const newActor = new Actors({name: name});
    await newActor.save((err, actor) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            message: `Actor ${actor.name} guardado`
        })
    });
};

ActorCtrl.deleteActor = async (req, res) => { //Eliminar Actor
    const id = req.params.id;
    await Actors.findByIdAndDelete(id, (err, task) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 
        return res.status(200).json({
            ok: true,
            message: `Actor eliminado`
        })
    });
};

ActorCtrl.editActor = async (req, res) => { //Editar Actor
    const id = req.params.id;
    const name = req.body.name;
    await Actors.findByIdAndUpdate(id, {name: name});
    return res.status(200).json({
        ok: true,
        message: `Actor ${name} actualizado`
    })
};

ActorCtrl.addActivity = async (req, res) => { //Nueva Actividad
    const id = req.params.id;
    const name = req.body.name;
    const newActividad = new Activities({name: name});
    newActividad.save();
    await Actors.findByIdAndUpdate(id, {$push: {activities: newActividad}});
    return res.status(200).json({
        ok: true,
        message: `Actividad ${newActividad.name} guardada`
    })
};

ActorCtrl.getActivities = async (req, res) => { //Ver Actividades de un Actor
    const id = req.params.id;
    await Actors.findById(id)
    .populate('activities')
    .exec((err, actor) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            Actor: actor.name,
            Actividades: actor.activities
        });
    });
};

ActorCtrl.editActivity = async (req, res) => { //Editar Actividad
    const id = req.params.activity;
    const name = req.body.name;
    await Activities.findByIdAndUpdate(id, {name: name});
    return res.status(200).json({
        ok: true,
        message: `Actividad ${name} actualizada`
    })
};

ActorCtrl.deleteActivity = async (req, res) => { //Eliminar Actividad
    const id = req.params.activity;
    const id_act = req.params.id;
    await Activities.findByIdAndDelete(id, (err, task) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            Actors.findByIdAndUpdate(id_act, {$pull: {activities: id}});
            return res.status(200).json({
                ok: true,
                message: `Actividad eliminada`
            })
        }
    });
};

ActorCtrl.getTasks = async (req, res) => { //Ver Tareas de una Actividad
    const id = req.params.activity;
    await Activities.findById(id)
    .populate('tasks')
    .exec((err, activity) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            Tareas: activity.tasks
        });
    });
};

ActorCtrl.addTask = async (req, res) => { //Nueva Tarea
    const id = req.params.activity;
    const name = req.body.name;
    const newTask = new Tasks({name: name});
    newTask.save();
    await Activities.findByIdAndUpdate(id, {$push: {tasks: newTask}});
    return res.status(200).json({
        ok: true,
        message: `Tarea ${newTask.name} guardada`
    })
};

ActorCtrl.editTask = async (req, res) => { //Editar Tarea
    const id = req.params.task;
    const name = req.body.name;
    await Tasks.findByIdAndUpdate(id, {name: name});
    return res.status(200).json({
        ok: true,
        message: `Tarea ${name} actualizada`
    })
};

ActorCtrl.deleteTask = async (req, res) => { //Eliminar Tarea
    const id = req.params.task;
    const id_act = req.params.activity;
    await Tasks.findByIdAndDelete(id, (err, task) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            Activities.findByIdAndUpdate(id_act, {$pull: {tasks: id}});
            return res.status(200).json({
                ok: true,
                message: `Tarea eliminada`
            })
        }
    });
}

//Sub-routes
router.get('/actors', ActorCtrl.getActors);//Ver Actores
router.post('/actors', ActorCtrl.createActor);//Nuevo Actor

router.get('/actors/:id', ActorCtrl.getActor);//Ver un Actor
router.put('/actors/:id', ActorCtrl.editActor);//Editar Actor
router.delete('/actors/:id', ActorCtrl.deleteActor);//Eliminar Actor

router.get('/actors/:id/activities', ActorCtrl.getActivities);//Ver Actividades de un Actor
router.post('/actors/:id/activities', ActorCtrl.addActivity);//Nueva Actividad

router.put('/actors/:id/activities/:activity', ActorCtrl.editActivity);//Editar Actividad
router.delete('/actors/:id/activities/:activity', ActorCtrl.deleteActivity);//Eliminar Actividad
router.get('/actors/:id/activities/:activity', ActorCtrl.getTasks);//Ver Tareas de una Actividad
router.post('/actors/:id/activities/:activity', ActorCtrl.addTask);//Nueva Tarea

router.put('/actors/:id/activities/:activity/:task', ActorCtrl.editTask);//Editar Tarea
router.delete('/actors/:id/activities/:activity/:task', ActorCtrl.deleteTask);//Eliminar Tarea

module.exports = router;