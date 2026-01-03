import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from './transactions.service.js';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async list(@Req() req: any) {
    return this.transactionsService.getUserTransactions(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('balance')
  async balance(@Req() req: any) {
    return this.transactionsService.getUserBalance(req.user.userId);
  }
}