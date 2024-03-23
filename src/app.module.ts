import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { BacsiModule } from './bacsi/bacsi.module';
import { BenhnhanModule } from './benhnhan/benhnhan.module';
import { NhanvienModule } from './nhanvien/nhanvien.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatlichModule } from './datlich/datlich.module';
import { PhongModule } from './phong/phong.module';
import { ChuyenkhoaModule } from './chuyenkhoa/chuyenkhoa.module';
import { BenhModule } from './benh/benh.module';
import { ThuocModule } from './thuoc/thuoc.module';
import { LoaicanlamsangModule } from './loaicanlamsang/loaicanlamsang.module';
import { PhieuxacnhanModule } from './phieuxacnhan/phieuxacnhan.module';
import { SinhhieuModule } from './sinhhieu/sinhhieu.module';
import { ToathuocModule } from './toathuoc/toathuoc.module';
import { DichvuModule } from './dichvu/dichvu.module';
import { HoadonModule } from './hoadon/hoadon.module';
import { SobenhModule } from './sobenh/sobenh.module';
import { PhieuchidinhcanlamsangModule } from './phieuchidinhcanlamsang/phieuchidinhcanlamsang.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { KetquacanlamsangModule } from './ketquacanlamsang/ketquacanlamsang.module';
/* import { ServeStaticModule } from '@nestjs/serve-static'; */
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { PubSub } from 'graphql-subscriptions';
import { DatlichResolver } from './datlich/datlich.resolver';

@Module({
  controllers: [AppController,],
  providers: [AppService],
  imports: [
    /* ConfigModule.forRoot({
      isGlobal: true
    }), */
    MongooseModule.forRoot('mongodb://localhost:27017/QuanLyPhongKham'),
    UsersModule,
    BenhnhanModule,
    NhanvienModule,
    BacsiModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true
    }),
    BenhModule,
    DatlichModule,
    LoaicanlamsangModule,
    ChuyenkhoaModule,
    PhongModule,
    ThuocModule,
    PhieuxacnhanModule,
    ToathuocModule,
    DichvuModule,
    HoadonModule,
    SobenhModule,
    PhieuchidinhcanlamsangModule,
    SinhhieuModule,
    AuthModule,
    FileUploadModule,
    KetquacanlamsangModule,
  ],
})
export class AppModule { }
