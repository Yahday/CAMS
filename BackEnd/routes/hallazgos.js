const { Router } = require('express');
const fs = require('fs');
const router = Router();

const Hallazgos = require('../models/hallazgos');

//Controller

function uploadIMG (fotos, folio, fotoDe){
    let fotografia = [];
    let index = 0;
    for (let foto of fotos) {
        index++;
        var Img = foto.replace(/^data:image\/jpeg;base64,/, "");
        let urlImagen =`./imagenes/hallazgos/${folio}_${fotoDe}_${index}.jpg`;
        fotografia.push({
            _id: index,
            fotografia: urlImagen
        });
        fs.writeFile(`./imagenes/hallazgos/${folio}_${fotoDe}_${index}.jpg`, Img, 'base64', function(err) {
            if (err) {console.log(err)}// writes out file without error, but it's not a valid image         
        });
    }
    return fotografia
}

const HallazgosCtrl = {};

//Ver hallazgos del actual status agrupados en areas y acomodado en orden de criticidad
HallazgosCtrl.getHallazgos = async(req, res) => {
    const estado = req.params.status //Status solicitado (validos: hallazgo, ots, revision y liquidacion)
    const cm = req.user.cm          //Central de Mantenimiento del Usuario
    const areas = req.user.areas    //Array de Areas que el Usuario puede ver
    await Hallazgos.aggregate([{
                $match: { //Filtros
                    centroManto: { $in: cm },                    
                    area: { $in: areas },
                    status: estado
                }
            },
            {$lookup:
                {
                  from: 'activities',
                  localField: 'activity',
                  foreignField: 'name',
                  as: 'activity'
                }
            },
            {$lookup:
                {
                  from: 'centrals',
                  localField: 'central',
                  foreignField: '_id',
                  as: 'central'
                }
            },
            {
                $group: {
                    _id: "$area", //Agrupar por Areas
                    cant_folios: { $sum: 1 }, //Contar los folios existentes en cada area
                    hallazgos_area: {  
                        $addToSet: {                                        //Arrojar datos del Hallazgo:
                            folio: "$folio",                                //-Folio
                            Criticidad: "$criticity",                       //-Criticidad
                            User: {$arrayElemAt: ["$bitacora.user", 0]},    //-Usuario (tomado del primer comentario)
                            Activity: '$activity.name',                     //-Actividad
                            Central: '$central.name',                       //-Nombre de Central
                            Ubicacion: '$central.ubicacion'                 //-Ubicacion de la Central
                        }                            
                    }
                }
            },
            { $sort: { criticity: -1 } } //Acomodar por criticidad del folio en descendente (mayor criticidad primero) 
        ])
        .exec((err, hallazgos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    hallazgos
                })

            }
        })
}

HallazgosCtrl.postHallazgo = async(req, res) => { //Nuevo Hallazgo
    const hallazgo = req.body;
    let fotografia = uploadIMG(hallazgo.fotos, hallazgo.folio, 'hal');
    const newHallazgo = new Hallazgos({
        fecha: hallazgo.fecha,
        folio: hallazgo.folio,
        centroManto: hallazgo.cm,
        central: hallazgo.central,
        area: hallazgo.area,
        activity: hallazgo.activity,
        criticity: hallazgo.criticity,
        siniestro: hallazgo.siniestro,
        bitacora: {
            user: req.user.name,
            comment: hallazgo.comment,
            fecha: hallazgo.fecha
        },
        status: 'hallazgo',
        fotografias_h: fotografia
    });
    await newHallazgo.save((err, hallazgo) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            message: `Hallazgo ${hallazgo.folio} guardado`
        })
    })
}

HallazgosCtrl.getHallazgo = async (req, res) => { //Buscar un Hallazgo
    const id = req.params.id;
    await Hallazgos.findById(id)
        .exec((err, hallazgo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                hallazgo
            })
        });
};

HallazgosCtrl.editHallazgo = async(req, res) => { //Editar Hallazgo
    const id = req.params.id //id del hallazgo
    const hallazgo = req.body;
    let fotografia = uploadIMG(hallazgo.fotos, hallazgo.folio, 'liq');;
    const hallazgoEditado = { //Nuevos datos
        area: hallazgo.area,
        activities: hallazgo.activities,
        criticity: hallazgo.criticity,
        siniestro: hallazgo.siniestro
    };
    await Hallazgos.findByIdAndUpdate(id, { $set: hallazgoEditado, $addToSet: {fotografias_l: fotografia}})
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Hallazgo ${hallazgo.folio} actualizado`
                })
            }
        })
}

HallazgosCtrl.deleteHallazgo = async(req, res) => { //Eliminar Hallazgo
    const id = req.params.id //id del hallazgo
    await Hallazgos.findByIdAndDelete(id)
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Hallazgo eliminado`
                })
            }
        })
}

HallazgosCtrl.comentarHallazgo = async (req, res) => { //Agregar comentario
    const id = req.params.id //id del hallazgo
    const newComment = {
        user: req.user.name,
        comment: req.body.comment,
        fecha: req.body.fecha 
    }
    await Hallazgos.findByIdAndUpdate(id, {$push: {bitacora: newComment}})
    .exec((err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                message: `Comentario agregado`
            })
        }
    })
}

HallazgosCtrl.moverHallazgo = async (req, res) => { //Mandar Hallazgo a otro Status
    const id = req.params.id //id del hallazgo
    const direccion = req.params.mover //Si hallazgo se manda a siguiente o anterior Status
    const status = req.params.status; //status actual del hallazgo
    const user = req.user.name;    
    let newStatus = '' //el hallazgo cambiara al valor de este status
    if (direccion == 'sig') { //Si se avanza a siguiente status...
        switch (status) {
            case 'hallazgo':
                newStatus = 'ots'
                break;
            case 'ots':
                newStatus = 'revision'
                break;
            case 'revision':
                newStatus = 'liquidacion'
                break;
            case 'liquidacion':
                newStatus = 'archivero'
                break;    
            default:
                return res.status(400).json({
                    ok: false,
                    err
                });
        }  
    }
    if (direccion == 'ant') {//Si se regresa a anterior status...
        switch (status) {   
            case 'hallazgo'://En caso de eliminar el hallazgo
                newStatus = 'archivero'
                break; 
            case 'ots':
                newStatus = 'hallazgo'
                break;
            case 'revision':
                newStatus = 'ots'
                break;
            case 'liquidacion':
                newStatus = 'revision'
                break;
            case 'archivero':
                newStatus = 'liquidacion'
                break;  
                 
            default:
                return res.status(400).json({
                    ok: false,
                    err
                });
            }       
    }
    let newComment = {
        user: req.user.name,
        comment: `Hallazgo movido a ${newStatus}`,
        fecha: req.body.fecha
    }
    await Hallazgos.findByIdAndUpdate(id, {status: newStatus, $push: {bitacora: newComment}})
    return res.status(200).json({
        ok: true,
        message: newComment.comment
    })
}
//Sub-routes


router.get('/hallazgos/:status', HallazgosCtrl.getHallazgos); //Ver hallazgos por status
router.post('/hallazgos/:status', HallazgosCtrl.postHallazgo); //Nuevo hallazgo

router.get('/hallazgos/:status/:id', HallazgosCtrl.getHallazgo); //Editar Hallazgo

router.put('/hallazgos/:status/:id', HallazgosCtrl.editHallazgo); //Editar Hallazgo
router.delete('/hallazgos/:status/:id', HallazgosCtrl.deleteHallazgo); //Eliminar Hallazgo

router.put('/hallazgos/:status/:id/comentar', HallazgosCtrl.comentarHallazgo); //Agregar comentario

router.put('/hallazgos/:status/:id/:mover', HallazgosCtrl.moverHallazgo); //Mandar Hallazgo a siguiente o anterior Status

module.exports = router;