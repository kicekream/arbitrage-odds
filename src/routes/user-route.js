const router = require('express').Router();
const { register, login, check } = require('../controllers/user-controller');
const { Validate } = require('../utils');
const { CreateUserSchema, AuthenicateSchema } = require('../validations');
const {auth} = require("../middleware/auth")

router.post('/register', Validate(CreateUserSchema), register);
router.post('/login', Validate(AuthenicateSchema), login);
router.get("/check", auth, check)

module.exports = router;
