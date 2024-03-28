import { registerEnumType } from "@nestjs/graphql";

export enum TrangThaiDatKham{
    DANGXET = 'DANGXET',
    XACNHAN = 'XACNHAN',
}

registerEnumType(TrangThaiDatKham, {
    name: 'TrangThaiDatKham'
})