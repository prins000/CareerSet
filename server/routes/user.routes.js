import express from 'express';
import {register,login,updateProfile,logout} from '../controller/user.controller.js';
import {isAuth} from '../middlewares/isAuth.js';
const router= express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.get('/logout',logout);
router.route('/profile/update').post(isAuth,updateProfile);


export default router;
