import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service.js';
import { FundWebhookDto } from './dto/fund-webhook.dto.js';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // Mock webhook endpoint to fund a user's account
  @Post('fund')
  async fund(@Body() body: FundWebhookDto) {
    const { userId, amount, description } = body;
    return this.transactionsService.creditUser(userId, amount, description);
  }
}