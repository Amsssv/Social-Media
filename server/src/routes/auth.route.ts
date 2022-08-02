import {Router} from 'express';
import {UserController} from '../controllers'
import {errorHandler} from "../middlewares/errorHandler.middleware";
import {body} from "express-validator";

const router = Router();

const controller = new UserController();

router.use(errorHandler);

router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    controller.signUp);
router.post('/login', controller.logIn);
router.post('/logout', controller.logOut);
// router.get('/refresh', UserController.refresh);

export default router;
