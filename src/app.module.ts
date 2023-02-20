import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EssencesController } from './essences/essences.controller';
import { EssencesService } from './essences/essences.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, EssencesController],
  providers: [AppService, EssencesService],
})
export class AppModule {}
