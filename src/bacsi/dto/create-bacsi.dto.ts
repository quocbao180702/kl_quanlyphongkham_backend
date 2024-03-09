import { ChuyenKhoa } from "src/chuyenkhoa/entities/chuyenkhoa.entity";
import { Phong } from "src/phong/entities/phong.entity";
import { Users } from "src/users/entities/user.entity";

export class CreateBacSiDto{
	hoten: string;
	ngaysinh: Date;
	gioitinh: boolean;
	diachi: string;
	cccd: string;
	ngayBD: Date;
	user: string;
	phongs: string[];
	chuyenkhoa: string;
}