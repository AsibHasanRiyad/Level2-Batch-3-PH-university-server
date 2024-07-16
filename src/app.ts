/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

// Update CORS configuration
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests, etc.)
      if (!origin) return callback(null, true);
      if (origin.includes(origin)) {
        return callback(null, true);
      } else {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
    },
    credentials: true,
  }),
);

// application routes
app.use('/api/v1', router);

// const test = async (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

// app.get('/', test);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
