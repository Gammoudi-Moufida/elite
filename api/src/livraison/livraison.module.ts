import { HttpModule, Module } from '@nestjs/common';
import { LivraisonController } from './controllers/livraison.controller';
import { livraisonService } from './livraison.service';


@Module({
  imports: [HttpModule],
  controllers: [LivraisonController],
  providers: [livraisonService]
})
export class LivraisonModule {}
