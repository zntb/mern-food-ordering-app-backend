import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'colors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import myUserRoute from './routes/myUserRoute';

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log(`Connected to database!`.magenta.underline.bold));

const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`.cyan.underline);
});
