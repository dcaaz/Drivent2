import { findPayment, insert } from "@/repositories/payments-repository"
import { findUserId, findTicketId, findFirstTicketType, update } from "@/repositories/ticket-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentPost, CreatePaymentObj } from "@/protocols";

export async function getPayments(ticketId: number, userId: number) {

    const ticketIdExist = await findTicketId(ticketId)

    if (!ticketIdExist) {
        throw notFoundError()
    }

    const ticketIdWithUser = await findUserId(userId)

    if (ticketIdExist.enrollmentId !== ticketIdWithUser.id) {
        throw unauthorizedError()
    }

    return await findPayment(ticketId);
}

export async function postPayments(info: PaymentPost, userId: number) {
    const { ticketId, cardData } = info;
    const lastDigits = cardData.number.slice(-4);

    const ticketIdExist = await findTicketId(ticketId)

    if (!ticketIdExist) {
        throw notFoundError()
    }

    const ticketIdWithUser = await findUserId(userId)

    if (ticketIdExist.enrollmentId !== ticketIdWithUser.id) {
        throw unauthorizedError()
    }

    const ticketType = await findFirstTicketType(ticketIdExist.ticketTypeId);

    await update(ticketId, "PAID");

    const insertPayment: CreatePaymentObj = {

        ticketId,
        value: ticketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: lastDigits
    }

    return await insert(insertPayment)


}