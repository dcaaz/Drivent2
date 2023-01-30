import { prisma } from "@/config";
import { TicketType, CreateTicket } from "@/protocols";

export async function findManyTicketsTypes(): Promise<TicketType[]>{
    return prisma.ticketType.findMany()
}

export async function findFirstTicket(enrollmentId: number){
    return prisma.ticket.findFirst({
        where:{
            enrollmentId
        }
    })
}

export async function findUserId(userId: number){
    return prisma.enrollment.findFirst({
        where: { 
            userId
        }
      });
}

export async function findFirstTicketType(id: number){
    return prisma.ticketType.findFirst({
        where:{
            id
        }
    })
}

export async function findTogetherTicket(enrollmentId: number){
    return await prisma.ticket.findFirst({
        where:{
            enrollmentId
        }, 
        include:{
            TicketType: true
        }
    })
}


export async function create(createNewTicket: CreateTicket){
    return prisma.ticket.create({
        data:createNewTicket,
        include:{
            TicketType: true
        }
    })
}