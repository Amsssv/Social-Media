import {Router} from 'express';
import {UserController} from '../controllers'
const router = Router();
import {body} from "express-validator";

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    UserController.registration);
router.post('/login',  UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

export default router;
