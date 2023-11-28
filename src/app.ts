import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application route

app.get('/', (req: Request, res: Response) => {
  res.json({
    Operation: 'Success',
  });
});

export default app;
