import { LinkImage } from "src/types/LinkImage.types";
import { UserRole } from "src/types/Users.types";

export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: UserRole;
    isLocked: boolean
    avatar: LinkImage
  }