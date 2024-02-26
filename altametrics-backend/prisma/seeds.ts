import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  // Hash passwords
  const hashedPassword = await bcrypt.hash('test123', saltRounds);

  await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'Test User',
    },
  });

  await prisma.invoice.createMany({
    data: [
      {
        amount: 100.50,
        due_date: new Date(),
        description: 'First Invoice',
        user_id: 1
      },
      {
        amount: 200.75,
        due_date: new Date(),
        description: 'Second Invoice',
        user_id: 1
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
});
