import express from 'express';
import { applyjob,getApplicant ,getApplication,updateStatus } from '../controller/application.controller.js';
import {isAuth} from '../middlewares/isAuth.js';
import { uploadSingle } from '../middlewares/multer.js';

const router= express.Router();

router.route('/apply/:jobId').post(isAuth ,uploadSingle('resume'), applyjob);
router.route('/get').get(isAuth,getApplication);
router.route('/applicants/:jobId').get(isAuth,getApplicant);
router.route('/update/:applicationId').put(isAuth,updateStatus);


export default router;
