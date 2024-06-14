import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateSectionDto } from './dtos/update-section.dto';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dtos/create-section.dto';
import { AdminAuthGuard } from 'src/guards/adminAuth.guard';

@Controller('sections')
export class SectionsController {

    constructor(private sectionsService : SectionsService)
    {

    }

    @Get()
    getAll()
    {
        return this.sectionsService.getAll()
    }

    @Get(':sectionCode')
    getOne(@Param('sectionCode') sectionCode : string)
    {
        return this.sectionsService.getOne(sectionCode)
    }

    @Patch(':sectionCode')
    @UseGuards(AdminAuthGuard)
    update(@Param('sectionCode') sectionCode : string , @Body() updateSectionDto : UpdateSectionDto)
    {
        console.log(updateSectionDto)
        return this.sectionsService.update(sectionCode,updateSectionDto)
    }

    @Post()
    @UseGuards(AdminAuthGuard)
    createNew(@Body() createSectionDto : CreateSectionDto)
    {
        return this.sectionsService.createNew(createSectionDto)
    }

    @Delete(':sectionCode')
    @UseGuards(AdminAuthGuard)
    deleteSection(@Param('sectionCode') sectionCode : string)
    {
        return this.sectionsService.deleteSection(sectionCode)
    }



    /*
    /sections
    
    */
}
