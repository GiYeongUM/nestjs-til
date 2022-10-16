import {
    Column,
    Entity,
} from 'typeorm';
import {BaseEntity} from '../../common/entities/base.entity';
import {ClientDto} from "../dto/client.dto";

@Entity({
    name: 'tbl_client',
})
export class Client extends BaseEntity {
    @Column({nullable: true})
    platform: string;

    @Column({nullable: true})
    clientId: string;

    static from(clientDto: ClientDto): Client {
        const clientEntity = new Client();
        clientEntity.platform = clientDto.platform;
        clientEntity.clientId = clientDto.clientId;
        return clientEntity;
    }
}
