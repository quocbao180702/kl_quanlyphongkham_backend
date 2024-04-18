import { MailerModule } from '@nestjs-modules/mailer';
import { Module, Options } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          port: 587,
          secure: false,
          auth: {
            user: config.get('SMTP_MAIL'),
            pass: config.get('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: "Becodemy"
        },
        template: {
          dir: join(__dirname, 'mail/templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false
          },
        },
      }),
      inject: [ConfigService]
    })
  ],
  exports: [MailService]
})
export class MailModule { }
