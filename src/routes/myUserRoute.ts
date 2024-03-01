import express from 'express';
import myUserController from '../controllers/myUserController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/validation';

const router = express.Router();

// /api/my/user
router
  .route('/')
  .get(jwtCheck, jwtParse, myUserController.getCurrentUser)
  .post(jwtCheck, myUserController.createCurrentUser)
  .put(
    jwtCheck,
    jwtParse,
    validateMyUserRequest,
    myUserController.updateCurrentUser
  );

export default router;
