const Router = require('express');
const { getUsers } = require('./authController');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');

router.post('/registration',
  [check('username', 'имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть больше 4 и меньше 10 символов').isLength({min:4, max: 10})
  ], 
  controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);
router.post('/user', controller.changeUser);
router.post('/column', controller.createColumn);
router.get('/column', controller.getColumns);
router.get('/onecolumn', controller.getColumn);
router.post('/chngcolumn', controller.changeColumn);
router.post('/deltask', controller.delTask);
router.post('/updatetask', controller.updateTask);
router.delete('/deltcolumn', controller.deleteColumn);
router.post('/deleteboard', controller.deleteBoard);

module.exports = router;