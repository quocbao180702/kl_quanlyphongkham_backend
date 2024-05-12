import { Controller, Post, Get, UploadedFile, UploadedFiles, UseInterceptors, Param, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
/* import { storageConfig } from 'helper/config'; */
import { v1 as uuidv1 } from 'uuid';
import { diskStorage } from 'multer';
import { get } from 'https';
import path, { join } from 'path';
import { Response } from 'express';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { TestService } from 'src/test/test.service';
import { BacsiService } from 'src/bacsi/bacsi.service';
import { NhanvienService } from 'src/nhanvien/nhanvien.service';
import { ThuocService } from 'src/thuoc/thuoc.service';
import { BenhnhanService } from 'src/benhnhan/benhnhan.service';


const editFileName = (_, file, callback) => {
    callback(null, uuidv1() + '--' + file.originalname)
}


export const imageFilter = (_, file, callback) => {
    if (
        !file.originalname.match(
            /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG|bmp|BMP)$/,
        )
    ) {
        return callback(new Error('Only image are allowed!'), false)
    }
    callback(null, true)
}


export const excelFilter = (_, file, callback) => {
    if (
        !file.originalname.match(
            /\.(xls|xlsx|XLS|XLSX|csv|CSV)$/,
        )
    ) {
        return callback(new Error('Chỉ cho phép tệp Excel!'), false);
    }
    callback(null, true);
};


@Controller('file-upload')
export class FileUploadController {

    constructor(private readonly testService: TestService,
        private readonly bacsiService: BacsiService,
        private readonly nhanvienService: NhanvienService,
        private readonly thuocService: ThuocService,
        private readonly benhnhanService: BenhnhanService
    ) { }
    // images
    @Post('PhongKhamImageUpload')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: diskStorage({
                destination: `${process.env.FILE_PATH || 'files'}/images`,
                filename: editFileName,
            }),
            fileFilter: imageFilter,
        }),
    )
    async uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
        console.log(files)
        const response = []
        files.forEach((file) => {
            const fileResponse = {
                originalname: file.originalname,
                filename: file.filename,
            }
            response.push(fileResponse)
        })
        console.log(response)
        return response
    }


    

    @Post('PhongKhamDocumentBacSiUpload')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: diskStorage({
                destination: `${process.env.FILE_PATH || 'files'}/documents/bacsi`,
                filename: editFileName,
            }),
            fileFilter: excelFilter,
        }),
    )
    async uploadDocument(@UploadedFiles() files: Express.Multer.File[]) {
        try {
            const response = [];
            for (const file of files) {
                const results = await new Promise((resolve, reject) => {
                    const data = [];
                    fs.createReadStream(file.path)
                        .pipe(csv())
                        .on('data', (row) => data.push(row))
                        .on('end', () => resolve(data))
                        .on('error', (error) => reject(error));
                })
                    .then(async (data: any[]) => {
                        try {
                            for (const row of data) {
                                await this.testService.create(row);
                            }
                            return {
                                code: 201
                            };
                        } catch (error) {
                            return {
                                code: 404
                            };
                        }
                    })
                    .catch((error) => {
                        return {
                            code: 404
                        };
                    });

                response.push(results);
            }
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }

    /* @Post('PhongKhamDocumentBacSiUpload')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: diskStorage({
                destination: `${process.env.FILE_PATH || 'files'}/documents/bacsi`,
                filename: editFileName,
            }),
            fileFilter: excelFilter,
        }),
    )
    async uploadDocument(@UploadedFiles() files: Express.Multer.File[]) {
        try {
            const response = [];
            for (const file of files) {
                const results = await new Promise((resolve, reject) => {
                    const data = [];
                    fs.createReadStream(file.path)
                        .pipe(csv())
                        .on('data', (row) => data.push(row))
                        .on('end', () => resolve(data))
                        .on('error', (error) => reject(error));
                })
                    .then(async (data: any[]) => {
                        try {
                            for (const row of data) {
                                await this.testService.create(row);
                            }
                            return {
                                code: 201
                            };
                        } catch (error) {
                            return {
                                code: 404
                            };
                        }
                    })
                    .catch((error) => {
                        return {
                            code: 404
                        };
                    });

                response.push(results);
            }
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    } */

    @Post('PhongKhamDocumentBenhNhanUpload')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: diskStorage({
                destination: `${process.env.FILE_PATH || 'files'}/documents/benhnhan`,
                filename: editFileName,
            }),
            fileFilter: excelFilter,
        }),
    )
    async uploadBenhNhanDocument(@UploadedFiles() files: Express.Multer.File[]) {
        try {
            const response = [];
            for (const file of files) {
                const results = await new Promise((resolve, reject) => {
                    const data = [];
                    fs.createReadStream(file.path)
                        .pipe(csv())
                        .on('data', (row) => data.push(row))
                        .on('end', () => resolve(data))
                        .on('error', (error) => reject(error));
                })
                    .then(async (data: any[]) => {
                        try {
                            for (const row of data) {
                                await this.benhnhanService.createBenhNhan(row);
                            }
                            return {
                                code: 201
                            };
                        } catch (error) {
                            return {
                                code: 404
                            };
                        }
                    })
                    .catch((error) => {
                        return {
                            code: 404
                        };
                    });

                response.push(results);
            }
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }


    /* @Post('PhongKhamDocumentNhanVienUpload')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: diskStorage({
                destination: `${process.env.FILE_PATH || 'files'}/documents/nhanvien`,
                filename: editFileName,
            }),
            fileFilter: excelFilter,
        }),
    )
    async uploadNhanVienDocument(@UploadedFiles() files: Express.Multer.File[]) {
        try {
            const response = [];
            for (const file of files) {
                const results = await new Promise((resolve, reject) => {
                    const data = [];
                    fs.createReadStream(file.path)
                        .pipe(csv())
                        .on('data', (row) => data.push(row))
                        .on('end', () => resolve(data))
                        .on('error', (error) => reject(error));
                })
                    .then(async (data: any[]) => {
                        try {
                            for (const row of data) {
                                await this.nhanvienService.createNhanVien(row);
                            }
                            return {
                                code: 201
                            };
                        } catch (error) {
                            return {
                                code: 404
                            };
                        }
                    })
                    .catch((error) => {
                        return {
                            code: 404
                        };
                    });

                response.push(results);
            }
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    } */


    @Post('PhongKhamDocumentThuocUpload')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: diskStorage({
                destination: `${process.env.FILE_PATH || 'files'}/documents/thuoc`,
                filename: editFileName,
            }),
            fileFilter: excelFilter,
        }),
    )
    async uploadThuocDocument(@UploadedFiles() files: Express.Multer.File[]) {
        try {
            const response = [];
            for (const file of files) {
                const results = await new Promise((resolve, reject) => {
                    const data = [];
                    fs.createReadStream(file.path)
                        .pipe(csv())
                        .on('data', (row) => data.push(row))
                        .on('end', () => resolve(data))
                        .on('error', (error) => reject(error));
                })
                    .then(async (data: any[]) => {
                        try {
                            for (const row of data) {
                                await this.thuocService.createThuoc(row);
                            }
                            return {
                                code: 201
                            };
                        } catch (error) {
                            return {
                                code: 404
                            };
                        }
                    })
                    .catch((error) => {
                        return {
                            code: 404
                        };
                    });

                response.push(results);
            }
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }
}
