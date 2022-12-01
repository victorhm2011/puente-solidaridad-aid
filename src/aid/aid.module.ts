import { Module } from '@nestjs/common';
import { AidService } from './services/aid.service';
import { AidController } from './controllers/aid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AidEntity } from './models/aid.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([AidEntity]),
    HttpModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  providers: [AidService, JwtGuard, JwtStrategy, RolesGuard,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }],
  controllers: [AidController]
})
export class AidModule {}
