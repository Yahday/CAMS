const { Router } = require('express');
const router = Router();

const Hallazgos = require('../models/hallazgos');

//Controller

const HallazgosCtrl = {};

//Ver hallazgos del actual status agrupados en areas y acomodado en orden de criticidad
HallazgosCtrl.getHallazgos = async(req, res) => {
    const estado = req.params.status //Status solicitado (validos: pendientes, ots, revision y liquidacion)
    const cm = req.user.cm //Central de Mantenimiento del Usuario
    const areas = req.user.areas //Array de Areas que el Usuario puede ver
    await Hallazgos.aggregate([{
                $match: { //Filtros
                    area: { $in: areas },
                    status: estado,
                    centroManto: { $in: cm }
                }
            },
            {
                $group: {
                    _id: "$area", //Agrupar por Areas
                    cant_folios: { $sum: 1 }, //Contar los folios existentes en cada area
                    hallazgos_area: { //Arrojar Folio y Criticidad
                        $addToSet: { folio: "$folio", Criticidad: "$criticity" }
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
    const newHallazgo = new Hallazgos({
        fecha: hallazgo.fecha,
        folio: hallazgo.folio,
        centroManto: hallazgo.folio,
        central: hallazgo.central,
        area: hallazgo.area,
        Activities: hallazgo.activities,
        criticity: hallazgo.criticity,
        siniestro: hallazgo.siniestro,
        bitacora: hallazgo.bitacora,
        status: 'pendientes'
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

HallazgosCtrl.editHallazgo = async(req, res) => { //Editar Hallazgo
    const id = req.params.id //id del hallazgo
    const hallazgo = req.body;
    const hallazgoEditado = { //Nuevos datos
        area: hallazgo.area,
        activities: hallazgo.activities,
        criticity: hallazgo.criticity,
        siniestro: hallazgo.siniestro
    };
    await Hallazgos.findByIdAndUpdate(id, { $set: hallazgoEditado })
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Hallazgo actualizado`
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

HallazgosCtrl.comentarHallazgo = async(req, res) => { //Pendiente comentario (checar datos del token)
    const id = req.params.id //id del hallazgo
    const user = req.body.user;
}

HallazgosCtrl.moverHallazgo = async (req, res) => { //Mandar Hallazgo a otro Status
    const id = req.params.id //id del hallazgo
    const direccion = req.params.mover //Si hallazgo se manda a siguiente o anterior Status
    const status = req.params.status; //status actual del hallazgo
    const user = req.body.user;    
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
    return res.status(200).json({
        ok: true,
        message: comentario
    })
}
//Sub-routes
router.get('/hallazgos/:status', HallazgosCtrl.getHallazgos); //Ver hallazgos por status
router.post('/hallazgos/:status', HallazgosCtrl.postHallazgo); //Nuevo hallazgo

router.put('/hallazgos/:status/:id', HallazgosCtrl.editHallazgo); //Editar Hallazgo
router.delete('/hallazgos/:status/:id', HallazgosCtrl.deleteHallazgo); //Eliminar Hallazgo

router.put('/hallazgos/:status/:id/:mover', HallazgosCtrl.moverHallazgo); //Mandar Hallazgo a siguiente o anterior Status

module.exports = router;