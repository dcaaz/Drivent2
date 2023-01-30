import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { getPayments, postPayments } from "@/services/payments-service";

export async function findPayments(req: AuthenticatedRequest, res: Response) {
    const { ticketId } = req.query;

    try {

        const payments = await getPayments(+ticketId, req.userId);
        res.status(200).send(payments);

    } catch (error) {
        if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
        if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function createPayments(req: AuthenticatedRequest, res: Response) {

    const info = req.body

    try {

        const payments = await postPayments(info, req.userId)
        res.status(200).send(payments)

    } catch (error) {
        if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
        if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    }
}