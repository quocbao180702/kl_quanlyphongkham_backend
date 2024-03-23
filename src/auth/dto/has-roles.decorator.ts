import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/types/Users.types';

export const ROLES_KEY = 'roles'; // Khai báo hằng số ROLES_KEY

export const HasRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles); // Sử dụng hằng số ROLES_KEY
