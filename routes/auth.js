const router = require('express').Router();
const { postNewUser, userLogin } = require('../controllers/user');
const createCartIfNotExist=require('../middleware/createCartIfNotExists');

router.route('/register').post(postNewUser);
router.route('/login').post(userLogin);

module.exports = router;
