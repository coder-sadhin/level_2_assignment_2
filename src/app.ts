import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoute } from './app/Modules/Users/user.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application route
app.use('/api/users', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  res.json({
    Operation: 'Success',
  });
});

export default app;
