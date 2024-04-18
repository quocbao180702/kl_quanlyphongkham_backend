import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type mailOptions = {
    subject: string;
    email: string;
    name: string;
    content: string;
    template: string;
}

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async guiMailPhieuXacNhan({
        subject,
        email,
        name,
        content,
        template
    }: mailOptions){
        await this.mailerService.sendMail({
            to: email,
            subject,
            template,
            context: {
                name,
                content
            }
        })
    }
    
}
