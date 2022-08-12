import express from 'express';
import controller from '../controller/users';
import extractJWT from '../middleware/jwt';

const router = express.Router();

router.get('/validate', extractJWT ,controller.validateToken);
router.post('/register',controller.register);
router.post('/login',controller.login);
router.get('/users',controller.getAllUsers);

export = router;