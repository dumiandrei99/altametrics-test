import { User } from "@prisma/client";

export class UserDTO {
    id: number;
    email: string;
    name: string;
  
    constructor(user: User) {
      this.id = user.id;
      this.email = user.email;
      this.name = user.name;
    }
  }