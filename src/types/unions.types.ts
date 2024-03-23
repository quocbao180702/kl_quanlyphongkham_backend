import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';
import { BacSi } from 'src/bacsi/entities/bacsi.entity';
import { NhanVien } from 'src/nhanvien/entities/nhanvien.entity';
import { Users } from 'src/users/entities/user.entity';
import { createUnionType } from '@nestjs/graphql';

export const OnlyUserUnion = createUnionType({
    name: 'OnlyUser',
    types: () => [Users, BenhNhan, BacSi, NhanVien] as const,
    resolveType: (value) => {
        if (value.username) {
            return Users;
        }
        if (value.bhyt) {
            return BenhNhan;
        }
        if (value.chuyenkhoa) {
            return BacSi;
        }
        if (value.chucvu) {
            return NhanVien;
        }
        return null;
    },
});
