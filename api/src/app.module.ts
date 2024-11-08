import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriivemeModule } from './driiveme/driiveme.module';
import { LivraisonModule } from './livraison/livraison.module';
import { AlgoliaModule } from './algolia/algolia.module';

@Module({
  imports: [DriivemeModule, LivraisonModule, AlgoliaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
