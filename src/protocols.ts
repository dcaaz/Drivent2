import { Ticket, Payment } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string
}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type TicketType = {
  id: number,
  name: string,
  price: number,
  isRemote: boolean,
  includesHotel: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export type CreateTicket = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

export type PaymentPost = {
	ticketId: number,
	cardData: {
		issuer: string,
    number: string,
    name: string,
    expirationDate: string,
    cvv: string
	}
};

export type CreatePaymentObj = Omit<Payment, "id" | "createdAt" | "updatedAt">;
