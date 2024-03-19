import { Controller, Post, Get, UploadedFile, UploadedFiles, UseInterceptors, Param, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
/* import { storageConfig } from 'helper/config'; */
import { v1 as uuidv1 } from 'uuid';
import { diskStorage } from 'multer';
import { get } from 'https';
import path, { join } from 'path';
import { Response } from 'express';
import * as fs from 'fs';


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


@Controller('file-upload')
export class FileUploadController {
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
        /* console.log(files) */
        const response = []
        files.forEach((file) => {
            const fileResponse = {
                originalname: file.originalname,
                filename: file.filename,
            }
            response.push(fileResponse)
        })
        /* console.log(response) */
        return response
    }
}
