const { Router } = require('express');
const router = Router();

router.use(require('./login'));

router.use(require('./start'));

router.use(require('./actors'));


router.use(require('./users'));

router.use(require('./start'));
router.use(require('./actors'));

router.use(require('./users'));



module.exports = router;