import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EssencesService } from './essences.service';

@Controller('essences')
export class EssencesController {
  constructor(private readonly essencesService: EssencesService) {}

  @Get(':essenceType')
  getEssences(@Param() params, @Query() queryParams) {
    return this.essencesService.getEssencesData(
      `/api/v4/${params.essenceType}`,
      queryParams.timestamp,
    );
  }

  @Get(':essenceType/:id')
  getEssence(@Param() params) {
    return this.essencesService.getEssenceData(
      `/api/v4/${params.essenceType}/${params.id}`,
    );
  }

  @Post(':essenceType')
  postEssence(@Param() params) {
    return this.essencesService.postEssenceData(
      `/api/v4/${params.essenceType}`,
    );
  }
}
