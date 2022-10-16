import {Module} from '@nestjs/common';
import {EventsGateway} from './events.gateway';
import {Client} from "./entity/client.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Client]),],
    providers: [EventsGateway],
})
export class EventsModule {
}