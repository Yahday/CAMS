const { Router } = require('express');
const router = Router();

router.use(require('./login'));
router.use(require('./users'));

router.use(require('./start'));

module.exports = router;