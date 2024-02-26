import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { InvoiceController } from './controllers/invoice.controller';
import { PrismaService } from './services/prisma.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { InvoiceService } from './services/invoice.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret-test-key', // in production would use an .env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController, InvoiceController],
  providers: [PrismaService, AuthService, UserService, InvoiceService, JwtStrategy],
})
export class AppModule {}
