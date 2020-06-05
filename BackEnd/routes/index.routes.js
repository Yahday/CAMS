const { Router } = require('express');
const router = Router();

router.use(require('./login'));
router.use(require('./start'));
router.use(require('./area'));
router.use(require('./activities'));
router.use(require('./users'));

module.exports = router;