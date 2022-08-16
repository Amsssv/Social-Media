import express, { Express } from "express";
import router from "./src/routes";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import * as path from "path";
config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.static("../dist"));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist", "/index.html"))
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

app.listen(port, () =>
  console.log(`App is listening on the http://localhost:5000`)
);

export default app;
