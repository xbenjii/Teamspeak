import { connect, Socket } from 'net';
import { BaseConnection, BaseConnectionOptions } from './BaseConnection';
import { Message } from '../Message';

export interface TelnetConnectionOptions extends BaseConnectionOptions {
    host: string,
    port: number
}

export class TelnetConnection extends BaseConnection {

    private options: TelnetConnectionOptions
    private socket: Socket;

    constructor(options: TelnetConnectionOptions) {
        super();
        this.options = options;
    }

    public async connect(): Promise<any> {
        this.socket = connect(this.options.port, this.options.host);
    }

    public async close(): Promise<any> {
        this.socket.destroy();
        return this.socket;
    }

    public async send(message: Message): Promise<any> {
        if(this.socket.destroyed) {
            throw new Error('Socket has been closed');
        }
        this.socket.write(`${message.toString()}\n`);
    }

    public async onData(): Promise<any> {
        
    }

    public async onError(): Promise<any> {

    }

}