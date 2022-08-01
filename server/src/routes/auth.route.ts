import {Router} from 'express';
import {UserController} from '../controllers'
const router = Router();
import {body} from "express-validator";

const controller = new UserController();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    controller.registration);
router.post('/login',  controller.login);
router.post('/logout', controller.logout);
// router.get('/refresh', UserController.refresh);

export default router;
