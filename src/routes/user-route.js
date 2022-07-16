const router = require('express').Router();
const { register, login, me } = require('../controllers/user-controller');
const { Validate } = require('../utils');
const { CreateUserSchema, AuthenicateSchema } = require('../validations');
const {auth} = require("../middleware/auth")

router.post('/register', Validate(CreateUserSchema), register);
router.post('/login', Validate(AuthenicateSchema), login);
router.get("/me", auth, me)

module.exports = router;
