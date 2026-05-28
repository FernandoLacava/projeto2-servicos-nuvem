const router = require('express').Router();
const ctrl = require('../controllers/taskController');

router.get('/setup', ctrl.setup);
router.post('/tasks', ctrl.create);
router.get('/tasks', ctrl.findAll);
router.get('/tasks/:id', ctrl.findOne);
router.put('/tasks/:id', ctrl.update);
router.delete('/tasks/:id', ctrl.remove);

module.exports = router;
