import express, { Express } from 'express';
import router from "./src/routes";
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
dotenv.config()
const app: Express = express();
const port = process.env.PORT || 5000;

app.use('/api', router);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(port, () => console.log(`App is listening on the http://localhost:5000`))

export default app;