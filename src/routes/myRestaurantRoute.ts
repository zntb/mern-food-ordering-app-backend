import express from 'express';
import multer from 'multer';
import myRestaurantController from '../controllers/myRestaurantController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyRestaurantRequest } from '../middleware/validation';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

// /api/my/restaurant
router
  .route('/')
  .get(jwtCheck, jwtParse, myRestaurantController.getMyRestaurant)
  .post(
    upload.single('imageFile'),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    myRestaurantController.createMyRestaurant
  );

export default router;
