import express from 'express';
import { createCompany,getCompany,getCompanyById,updateCompany } from '../controller/company.controller.js';
import {isAuth} from '../middlewares/isAuth.js';
import { uploadSingle } from '../middlewares/multer.js';
const router= express.Router();

router.route('/register').post(isAuth, uploadSingle('logo'), createCompany);
router.route('/get').get(isAuth,getCompany);
router.route('/get/:id').get(isAuth,getCompanyById);
router.route('/update/:id').put(isAuth, uploadSingle('logo'), updateCompany);



export default router;
