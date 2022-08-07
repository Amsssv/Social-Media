import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export function credentialsErrors(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(403);
            return next(new Error('Validation error'));
        }
        next()
    }catch (e) {
        next(e)
    }

}
