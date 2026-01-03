import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import { User } from './auth/user.entity.js';
import { Transaction } from './transactions/transaction.entity.js';
import { TransactionsModule } from './transactions/transactions.module.js';
import { WebhookModule } from './webhook/webhook.module.js';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', 
      database: 'banking-assesment',
      entities: [User, Transaction],
      synchronize: true, 
    }),
    AuthModule,
    TransactionsModule,
    WebhookModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
