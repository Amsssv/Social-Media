import {Router} from 'express';
import {UserController} from '../controllers'
import {errorHandler} from "../middlewares/errorHandler.middleware";

const router = Router();

const controller = new UserController();

router.use(errorHandler);

router.post('/signup', controller.signUp);
router.post('/login', controller.logIn);
router.post('/logout', controller.logOut);
// router.get('/refresh', UserController.refresh);

export default router;
