import { Module } from '@nestjs/common';
import { AlgoliaController } from './controllers/algolia/algolia.controller';

@Module({
  providers: [],
  controllers: [AlgoliaController]
})
export class AlgoliaModule {}
