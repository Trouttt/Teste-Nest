import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CepModule } from './modules/cep/cep.module';

@Module({
  imports: [ TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (ConfigService: ConfigService) => (
      {
        type: 'postgres',
        host: ConfigService.get('DB_HOST' , 'localhost'),
        port: Number(ConfigService.get('DB_PORT', 5432)),
        username: ConfigService.get('DB_USERNAME','postgres'),
        password: ConfigService.get('DB_PASSWORD','postgres'),
        database: ConfigService.get('DB_DATABASE','test-firstt'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        autoLoadEntities: true,
        synchronize: true,
      }
    )
  }), UsersModule, CepModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
