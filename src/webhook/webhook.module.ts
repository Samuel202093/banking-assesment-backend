import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './webhook.controller.js';
import { TransactionsService } from '../transactions/transactions.service.js';
import { Transaction } from '../transactions/transaction.entity.js';
import { User } from '../auth/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User])],
  controllers: [WebhookController],
  providers: [TransactionsService],
})
export class WebhookModule {}