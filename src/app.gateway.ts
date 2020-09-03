import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3001, {
  path: '/websockets',
  serveClient: true,
  namespace: '/',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`message: ${client}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`message: ${client}`);
  }

  @SubscribeMessage('messaageToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('messageToClient', text);
    // return { event: 'messageToClient', data: text };
  }
}
