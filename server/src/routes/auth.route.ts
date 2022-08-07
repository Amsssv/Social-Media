import {Router} from 'express';
import {UserController} from '../controllers'
import {credentialsErrors, passwordValidation} from "../middlewares";
import {body} from "express-validator";

const router = Router();
const controller = new UserController();

router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    credentialsErrors,  controller.signUp);

router.post('/login', passwordValidation,  controller.logIn);
router.post('/logout', controller.logOut);
// router.get('/refresh', UserController.refresh);

export default router;
