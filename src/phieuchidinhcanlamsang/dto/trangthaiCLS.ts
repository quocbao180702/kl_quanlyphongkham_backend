import { registerEnumType } from "@nestjs/graphql";

export enum TrangThaiCLS{
    THANHTOAN = 'THANHTOAN',
    CHOKHAM = 'CHOKHAM',
    DAXETNGHIEM = 'DAXETNGHIEM',
}

registerEnumType(TrangThaiCLS, {
    name: 'TrangThaiCLS'
})