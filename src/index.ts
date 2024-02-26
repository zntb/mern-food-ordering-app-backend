import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'colors';
import morgan from 'morgan';

const PORT = process.env.PORT;

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/test', async (req: Request, res: Response) => {
  res.json({ message: 'Hello!' });
});

app.listen(5000, () => {
  console.log(`Server started on PORT ${PORT}`.cyan.underline);
});
