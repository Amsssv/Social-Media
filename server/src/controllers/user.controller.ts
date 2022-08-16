import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import model from "../models/user.model";
import jwt from "jsonwebtoken";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (e) {
      res.status(403).send("User with this email already exists");
    }
  }

  async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      // const { email } = req.body;
      // const payload = await model.getUserData(email);
      const accessToken = jwt.sign(
        {},
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: 900000 }
      );
      const refreshToken = jwt.sign(
        {},
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "30d" }
      );

      res.cookie("refreshToken", "Bearer " + refreshToken, {
        maxAge: 2592000000,
        sameSite: true,
        httpOnly: true,
      });
      res.json({
        accessToken,
        refreshToken,
        payload: {}, // ...payload,
      });
    } catch (e) {
      res.status(403).send("User with this email doesn't exist");
    }
  }

  async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refreshToken");
      return res.status(200).redirect("/api/login");
    } catch (e) {
      next(e);
    }
  }

  // async refresh(req: Request, res: Response, next: NextFunction) {
  //     try {
  //         // const {refreshToken} = req.cookies;
  //         //
  //         // if (!refreshToken) {
  //         //     new Error('User unauthorized');
  //         // }
  //         // const validRefreshToken = token.verifyRefreshToken(refreshToken) as payloadI;
  //         // if (!validRefreshToken) {
  //         //     new Error('Invalid refreshToken');
  //         // }
  //     } catch (e) {
  //         next(e)
  //     }
  // }
}

export default UserController;
