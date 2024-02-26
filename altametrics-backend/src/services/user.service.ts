import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserDTO } from 'src/dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async checkCredentials(email: string, password: string): Promise<UserDTO | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
      }

      return new UserDTO(user);
    } catch (error) {
      console.error('Error checking credentials:', error);
      throw error;
    }
  }
}