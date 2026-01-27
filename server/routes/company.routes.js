import express from 'express';
import { createCompany,getCompany,getCompanyById,updateCompany } from '../controller/company.controller.js';
import {isAuth} from '../middlewares/isAuth.js';
const router= express.Router();

router.route('/register').post(isAuth,createCompany);
router.route('/get').get(isAuth,getCompany);
router.route('/get/:id').get(isAuth,getCompanyById);
router.route('/update/:id').put(isAuth,updateCompany);



export default router;
