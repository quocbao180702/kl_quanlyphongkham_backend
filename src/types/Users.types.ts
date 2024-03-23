import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    STAFF = 'STAFF',
    DOCTOR = 'DOCTOR'
}

registerEnumType(UserRole, {
    name: 'UserRole',
});



export enum TypeImage {
    LINK = 'LINK',
    FILE = 'FILE'
}

registerEnumType(TypeImage, {
    name: 'TypeImage',
});


