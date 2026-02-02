import express from 'express';
import {postJob,filter,jobById,getJob,updateJob} from '../controller/job.controller.js';
import {isAuth} from '../middlewares/isAuth.js';
const router= express.Router();

router.route('/post').post(isAuth,postJob);
router.route('/get').get(filter);
router.route('/myjob').get(isAuth,getJob);
router.route('/:id').get(jobById);
router.route('/update/:id').put(isAuth,updateJob);


export default router;
