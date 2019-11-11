import { Module } from '@nestjs/common';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [JwtStrategyService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
