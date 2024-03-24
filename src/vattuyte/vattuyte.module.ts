import { Module } from '@nestjs/common';
import { VattuyteService } from './vattuyte.service';
import { VattuyteResolver } from './vattuyte.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Vattuyte, VattuyteSchema } from './entities/vattuyte.entity';

@Module({
  providers: [VattuyteResolver, VattuyteService],
  imports: [MongooseModule.forFeature([{name: Vattuyte.name, schema: VattuyteSchema}])]
})
export class VattuyteModule {}
