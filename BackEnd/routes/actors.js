const { Router } = require('express');
const _ = require('underscore');
const Actores = require('../models/actors');
const router = Router();

//Controller
const ActorCtrl = {};

ActorCtrl.getActors = async (req, res) => { //Todos los actores
    const actors = await Actores.find();
    res.json(actors);
}

ActorCtrl.getActor = async (req, res) => { //Buscar un actor
    const actor = await Actores.findById(req.params.id);
    res.json(actor);

}

ActorCtrl.createActor = async (req, res) => { //Nuevo Actor
    const { name } = req.body;
    const actor = new Actores({name: name});
    await actor.save();
    res.json({
        'status': 'Actor saved'
    });
}

ActorCtrl.editActor = async (req, res) => { //Editar Actor
    const { id } = req.params;
    const actor = {
        name: req.body.name,
        activities: req.body.activities,
        taks: req.body.taks
    }
    await Actores.findByIdAndUpdate(id, {$set: actor}, {new: true});
    res.json('actor update');
}

ActorCtrl.deleteActor = async (req, res) => { //Borrar Actor
    await Actores.findByIdAndRemove(req.params.id);
    res.json({status: 'Actor deleted'});
}

//Sub-routes
router.get('/', ActorCtrl.getActors);
router.get('/:id', ActorCtrl.getActor);
router.post('/', ActorCtrl.createActor);
router.put('/:id', ActorCtrl.editActor);
router.delete('/:id', ActorCtrl.deleteActor);

module.exports = router;