import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private txRepo: Repository<Transaction>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getUserTransactions(userId: number) {
    return this.txRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async getUserBalance(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return { balance: Number(user.balance) };
  }

  async creditUser(userId: number, amount: number, description?: string) {
    if (!Number.isFinite(userId) || userId < 1) {
      throw new BadRequestException('Invalid userId');
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException('Amount must be a positive number');
    }
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const tx = this.txRepo.create({ user, amount, type: 'credit', description });
    await this.txRepo.save(tx);

    user.balance = Number(user.balance) + Number(amount);
    await this.userRepo.save(user);

    return { success: true, balance: Number(user.balance) };
  }
}