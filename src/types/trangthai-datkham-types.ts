import { registerEnumType } from "@nestjs/graphql";

export enum TrangThaiDatKham{
    DANGXET = 'DANGXET',
    XACNHAN = 'XACNHAN',
    HUY = 'HUY'
}

registerEnumType(TrangThaiDatKham, {
    name: 'TrangThaiDatKham'
})