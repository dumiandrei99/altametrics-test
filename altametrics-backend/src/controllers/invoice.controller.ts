import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoiceService } from 'src/services/invoice.service';
import { Invoice } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('invoices')
@UseGuards(AuthGuard('jwt'))
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    @Get(':id')
    async getInvoice(@Param('id', ParseIntPipe) invoiceId: number): Promise<Invoice | null> {
        return this.invoiceService.invoice(invoiceId);
    }

    @Get()
    async getInvoices(): Promise<Invoice[]> {
        return this.invoiceService.invoices();
    }
}
