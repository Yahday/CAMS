const { Router } = require('express');
const { rutasProtegidas } = require('../middlewares/autentication');
const { getUsuario } = require('../middlewares/getuser');
const router = Router();

router.use(require('./login'));
router.use(require('./signup'));

//Rutas Protegidas
router.use([rutasProtegidas, getUsuario])  //Las siguientes rutas solo funcionan si el usuario: 1) Ya inicio sesion
router.use(require('./start'));                                                             //  2) Tiene un Token valido
router.use(require('./users'));                                                             //  3) Su Campo Status es True
router.use(require('./area'));
router.use(require('./activities'));
router.use(require('./centrals'));
router.use(require('./CM'));
router.use(require('./hallazgos'))

module.exports = router;