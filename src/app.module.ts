import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './global/middlewares/logger.middleware';
import { RateLimitMiddleware } from './global/middlewares/rate-limit.middleware';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AccountsModule,
    UserModule,
    AuthModule,
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, RateLimitMiddleware).forRoutes('*');
  }
}
