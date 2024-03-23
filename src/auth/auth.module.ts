import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { BenhnhanService } from 'src/benhnhan/benhnhan.service';
import { BenhnhanModule } from 'src/benhnhan/benhnhan.module';
import { BacsiModule } from 'src/bacsi/bacsi.module';
import { NhanvienModule } from 'src/nhanvien/nhanvien.module';

@Module({
  providers: [AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy],
  imports: [
    PassportModule.register({
      defaultStrategy: 'local'
    }),
    UsersModule,
    BenhnhanModule,
    BacsiModule,
    NhanvienModule,
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
      secret: `${process.env.jwt_secret}`, //process.env.JWT_SECRET
    })
  ]
})
export class AuthModule { }
