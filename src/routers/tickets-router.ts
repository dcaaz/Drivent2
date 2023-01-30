import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { findTicketsTypes, findTickets, createTickets } from "@/controllers/tickets-controller";
import { createTicketSchema } from "@/schemas/ticket-schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", findTicketsTypes)
  .get("/", findTickets)
  .post("/", validateBody(createTicketSchema), createTickets);

export { ticketsRouter };