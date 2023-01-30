import httpStatus from "http-status";
import {Request, Response} from "express"
import { getTicketTypes, getTicket, postTicket } from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function findTicketsTypes(req:  AuthenticatedRequest, res: Response){

    try{

       const tickets = await getTicketTypes();

       res.send(tickets);

    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function findTickets(req:AuthenticatedRequest, res:Response){

  try{

    const tickets = await getTicket(req.userId)
    res.send(tickets);

  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

}

export async function createTickets(req: AuthenticatedRequest, res:Response){

  const body = req;


  try{

    const ticket = await postTicket(body.body, body.userId);

    return res.status(201).send(ticket)


  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === "EnrollmentNotFound") return res.sendStatus(httpStatus.NOT_FOUND);
  }
}