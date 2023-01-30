import { Router } from "express";
import { authenticateToken, ticketIdValidation, validateBody } from "@/middlewares";
import { findPayments, createPayments } from "@/controllers/payments-controller";
import { createPaymentSchema } from "@/schemas/payments-schema";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", ticketIdValidation, findPayments)
  .post("/process", validateBody(createPaymentSchema), createPayments);

export { paymentsRouter };