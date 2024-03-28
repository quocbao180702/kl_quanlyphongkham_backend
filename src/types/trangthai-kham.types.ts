import { registerEnumType } from "@nestjs/graphql";

export enum TrangThaiKham{
    CHOKHAM = 'CHOKHAM',
    CHOXETNGIEM = 'CHOXETNGHIEM',
    DAXETNGHIEM = 'DAXETNGHIEM',
    HOANTAT = 'HOANTAT'
}

registerEnumType(TrangThaiKham, {
    name: 'TrangThaiKham'
})