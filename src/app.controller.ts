import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/images/:filename')
  async serveImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      let imagePath = path.join(process.cwd(), '/files/images/');
      imagePath = path.join(imagePath, filename);
      if (!fs.existsSync(imagePath)) {
        return res.status(404).send('Image not found');
      }
      return res.sendFile(imagePath);
    } catch (e) {
      console.error(e);
    }
  }

  @Delete('/images/:filename')
  async deleteImage(@Param('filename') filename: string,
    @Res() res: Response) {
    try {
      let imagePath = path.join(process.cwd(), '/files/images');
      imagePath = path.join(imagePath, filename);
      if (!fs.existsSync(imagePath)) {
        return res.status(404).send('Image not found');
      }
      await fs.promises.unlink(imagePath);
      return res.status(200).send('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      return res.status(500).send('Internal server error');
    }
  }

}
