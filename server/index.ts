import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

app.post('/api/login', (req: Request, res: Response) => {
    res.send({
        accessToken: 'REFRESH_TOKEN_1',
    })
})


app.listen(port, () => console.log(`App is listening on the http://localhost:5000`))

export default app;