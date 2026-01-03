import { Type } from 'class-transformer';
import { IsInt, Min, IsNumber, IsOptional } from 'class-validator';

export class FundWebhookDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  description?: string;
}