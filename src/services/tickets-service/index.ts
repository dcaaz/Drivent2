import { findManyTicketsTypes, 
    findFirstTicket, 
    findTogetherTicket,
    findFirstTicketType,
    create, 
    findUserId} from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { CreateTicket } from "@/protocols";

export async function getTicketTypes(){

    return await findManyTicketsTypes()

}

export async function getTicket(userId: number){

    const ticket = await findUserId(userId);

    if(!ticket) {
        throw notFoundError();
    }

    const ticketType = await findFirstTicket(ticket.id);

    if(!ticketType){
        throw notFoundError(); 
    }

    return await findTogetherTicket(ticket.id);

}

export async function postTicket(params: CreateTicket, userId: number){

    const {ticketTypeId} = params

    const ticketType = await findFirstTicketType(ticketTypeId);

    if(!ticketType) {
        throw notFoundError();
    }

    const ticket = await findUserId(userId);

    if(!ticket) {
        throw {name: "EnrollmentNotFound"};
    }

    const createNewTicket: CreateTicket  = {
        ticketTypeId,
        enrollmentId: ticket.id,
        status: "RESERVED"
    }

    return await create(createNewTicket)
}