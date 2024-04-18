import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { BenhnhanModule } from 'src/benhnhan/benhnhan.module';
import { BacsiModule } from 'src/bacsi/bacsi.module';
import { NhanvienModule } from 'src/nhanvien/nhanvien.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  providers: [AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    PassportModule.register({
      defaultStrategy: 'local'
    }),
    UsersModule,
    BenhnhanModule,
    BacsiModule,
    NhanvienModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule để sử dụng ConfigService
      useFactory: async (configService: ConfigService) => ({
        signOptions: { expiresIn: '1h' },
        secret: configService.get<string>('JWT_SECRET'), // Lấy giá trị từ .env
      }),
      inject: [ConfigService], // Inject ConfigService vào useFactory
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule { }
