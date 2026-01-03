import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Transaction } from './transactions/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { WebhookModule } from './webhook/webhook.module';
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
