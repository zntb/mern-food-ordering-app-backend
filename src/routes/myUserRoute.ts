import express from 'express';
import myUserController from '../controllers/myUserController';

const router = express.Router();

// /api/my/user
router.route('/').post(myUserController.createCurrentUser);

export default router;
