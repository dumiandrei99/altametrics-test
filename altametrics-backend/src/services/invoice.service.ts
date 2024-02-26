import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Invoice } from '@prisma/client';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async invoice(invoiceId: number): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({
      where:{
        id: invoiceId
      },
    });
  }

  async invoices(): Promise<Invoice[]> {
    return this.prisma.invoice.findMany();
  }
}