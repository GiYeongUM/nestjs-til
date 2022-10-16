// events.gateway.ts
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer, WsResponse,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger} from "@nestjs/common";
import {EventDto} from "./dto/event.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Client} from "./entity/client.entity";
import {Repository} from "typeorm";
import {ClientDto} from "./dto/client.dto";

@WebSocketGateway(8080, {transports: ['websocket']})
export class EventsGateway {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
    ) {}
    private logger: Logger = new Logger(EventsGateway.name);
    @WebSocketServer() server: Server;

    @SubscribeMessage('ClientConnect')
    async clientConnect(
        @MessageBody() eventDto: EventDto, // 클라이언트로부터 들어온 데이터
        @ConnectedSocket() client: Socket) {
        const res: EventDto = {
            platform: eventDto.platform,
            data: eventDto.data,
        };

        this.logger.log(`==== ClientConnect ====`);
        this.logger.log(`| platform => ${res.platform}`);
        this.logger.log(`| data => ${res.data}`);
        this.logger.log(`==== MessageEnd ====`);
        this.logger.log(``);

        const data: ClientDto = {
            platform: eventDto.platform,
            clientId: client.id,
        };
        const clientData = Client.from(data);
        await this.clientRepository
            .createQueryBuilder()
            .insert()
            .into(Client, ['platform', 'clientId'])
            .values(clientData)
            .execute();
    }


    @SubscribeMessage('ClientToServer')
    async handleMessage(
        @MessageBody() eventDto: EventDto, // 클라이언트로부터 들어온 데이터
        @ConnectedSocket() client: Socket) {
        const res: EventDto = {
            platform: eventDto.platform,
            data: eventDto.data,
        };

        this.logger.log(`==== ClientToServer ====`);
        this.logger.log(`| platform => ${res.platform}`);
        this.logger.log(`| data => ${res.data}`);
        this.logger.log(`==== MessageEnd ====`);
        this.logger.log(``);

        const user = await this.clientRepository.findBy({platform: 'app'});
        user.forEach((user) => {
            client.to(user.clientId).emit('ServerToClient', {
                platform: eventDto.platform,
                data: eventDto.data,
                time: Date.now()
            });
        });

    }

    afterInit(server: Server) {
        this.logger.log(`Init ${server.path()}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected : ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client Connected : ${client.id}`);
    }


}