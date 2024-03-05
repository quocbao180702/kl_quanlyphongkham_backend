import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helper/config';
import { v1 as uuidv1 } from 'uuid';
import { diskStorage } from 'multer';


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

    /* @Post('upload')
    @UseInterceptors(FileInterceptor('avatar',{storage: storageConfig('avatar')}))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    } */

    // images
    @Post('PhongKhamImageUpload')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: diskStorage({
                destination: `${process.env.FILE_PATH || 'file'}/images`,
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
}
