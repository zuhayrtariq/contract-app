import {
  IsAlpha,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateRequisitionDto{
  @IsNumber()
  @IsPositive()
  reqNo: number;

  @IsString()
  @MaxLength(5)
  @IsAlpha()
  sectionCode: string;

  @IsString()
  @MaxLength(75)
  @MinLength(1)
  title: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  vendorName?: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  buyerName?: string;

  @IsNumber()
  @IsPositive()
  reqACV: number;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  reqType: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  archived?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  emailAlerts?: number;

  @MaxLength(10)
  @IsString()
  reqDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(5)
  @IsAlpha()
  reqCurrency?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
