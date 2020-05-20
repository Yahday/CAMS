const { Router } = require('express');
const router = Router();

router.use(require('./login'));
router.use(require('./start'));
router.use(require('./users'));
router.use(require('./centrals'));

module.exports = router;