import { Module } from '@nestjs/common';
import { DriivemeController } from './controllers/driiveme.controller';

@Module({
  controllers: [DriivemeController]
})
export class DriivemeModule {}
