import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import model from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

class UserController {
  constructor() {
    this.logIn = this.logIn.bind(this);
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      validationResult(req).throw();
      const { name, email, password } = req.body;
      const userId = uuidv4();
      const hashPassword = await bcrypt.hash(password, 3);
      const result: any = await model.addUser(
        userId,
        email,
        hashPassword,
        name
      );
      res.send(result);
    } catch (err) {
      res.status(403).json({ err });
    }
  }

  async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const payload = await model.getUserData(email);
      const { id, name } = payload;
      let isPasswordValid = await bcrypt.compare(password, payload.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const { refreshToken, accessToken } = this._generateTokens(id);
      res
        .cookie("accessToken", "Bearer " + accessToken, {
          sameSite: true,
        })
        .cookie("refreshToken", "Bearer " + refreshToken, {
          httpOnly: true,
          sameSite: true,
        })
        .json({ id, name, email });
    } catch (e) {
      res.status(403).send(e);
    }
  }

  _generateTokens(payload: string) {
    const accessToken: string = jwt.sign(
      { payload },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: 900000 }
    );
    const refreshToken: string = jwt.sign(
      { payload },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "30d" }
    );
    return { accessToken, refreshToken };
  }
}

export default UserController;
