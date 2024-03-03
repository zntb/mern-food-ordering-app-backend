import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'colors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import myUserRoute from './routes/myUserRoute';
import myRestaurantRoute from './routes/myRestaurantRoute';
import restaurantRoute from './routes/restaurantRoute';
import orderRoute from './routes/orderRoute';

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log(`Connected to database!`.magenta.underline.bold));

const PORT = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'health OK!' });
});

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/order', orderRoute);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`.cyan.underline);
});
