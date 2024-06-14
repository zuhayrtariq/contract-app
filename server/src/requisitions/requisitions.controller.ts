import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RequisitionsService } from './requisitions.service';
import { CreateRequisitionDto } from './dtos/create-requisition.dto';
import { UpdateRequisitionDto } from './dtos/update-requisition.dto';
import { getRequisitionDto } from './dtos/get-requisition.dto';
import { AdminAuthGuard } from 'src/guards/adminAuth.guard';

@Controller('requisitions')
export class RequisitionsController {
  constructor(private readonly requisitionsService: RequisitionsService) { }

  @Get()
  getAll(@Query() getRequisitionDto: getRequisitionDto) {
    return this.requisitionsService.getAll(getRequisitionDto);
  }

  @Get(':reqNo')
  getOne(@Param('reqNo') reqNo: number) {
    return this.requisitionsService.getOne(reqNo);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() createRequisitionDto: CreateRequisitionDto) {
    return this.requisitionsService.create(createRequisitionDto);
  }

  @Post('/bulk')
  @UseGuards(AdminAuthGuard)
  createMany(@Body(new ParseArrayPipe({ items: CreateRequisitionDto })) createRequisitionDto: CreateRequisitionDto[]) {
    return this.requisitionsService.createMany(createRequisitionDto);
  }

  @Delete(':reqNo')
  @UseGuards(AdminAuthGuard)
  deleteRequisition(@Param('reqNo') reqNo: number) {
    return this.requisitionsService.deleteRequisition(reqNo)
  }

  @Patch(":reqNo")
  @UseGuards(AdminAuthGuard)
  update(@Param('reqNo') reqNo: number, @Body() updateRequisitionDto: UpdateRequisitionDto) {
    return this.requisitionsService.update(reqNo, updateRequisitionDto)
  }
}
