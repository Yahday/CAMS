const { Router } = require('express');
const router = Router();

router.use(require('./login'));
router.use(require('./start'));
router.use(require('./users'));
router.use(require('./area'));
router.use(require('./cm'))
router.use(require('./activities'));
router.use(require('./hallazgos'))

module.exports = router;