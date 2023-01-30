import { prisma } from "@/config";
import { CreatePaymentObj } from "@/protocols";

export async function findPayment(ticketId: number) {
    return await prisma.payment.findFirst({
        where: {
            ticketId
        }
    })
}

export async function insert(createPayment: CreatePaymentObj) {
    return prisma.payment.create({
        data: createPayment
    });
}