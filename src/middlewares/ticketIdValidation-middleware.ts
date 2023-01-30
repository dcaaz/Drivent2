import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function ticketIdValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    try {
        const { ticketId } = req.query;

        if (!ticketId) {
            return res.sendStatus(httpStatus.BAD_REQUEST)
        };

        next();

    } catch (err) {
        return err
    }
}