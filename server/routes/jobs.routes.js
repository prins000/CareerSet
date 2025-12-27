import express from 'express';
import {postJob,filter,jobById,getJob} from '../controller/job.controller.js';
import {isAuth} from '../middlewares/isAuth.js';
const router= express.Router();

router.route('/post').post(isAuth,postJob);
router.route('/get').get(isAuth,filter);
router.route('/myjob').get(isAuth,getJob);
router.route('/:id').get(isAuth,jobById);


export default router;
