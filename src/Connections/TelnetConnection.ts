import { connect, Socket } from 'net';
import readline from 'readline';

import { BaseConnection, BaseConnectionOptions } from './BaseConnection';
import { Message } from '../Message';

export interface TelnetConnectionOptions extends BaseConnectionOptions {
    host: string,
    port: number
}

export class TelnetConnection extends BaseConnection {

    private options: TelnetConnectionOptions
    private socket!: Socket;
    private stream!: readline.Interface;

    constructor(options: TelnetConnectionOptions) {
        super();
        this.options = options;
    }

    public async connect(): Promise<any> {
        this.socket = connect(this.options.port, this.options.host);
        return new Promise((resolve, reject) => {
            this.socket.on('connect', () => resolve());
            this.socket.on('error', (error) => reject(error));
        }).then(() => this.setupListener());
    }

    public async close(): Promise<any> {
        if(this.socket.destroyed) {
            throw new Error('Socket has already been closed');
        }
        this.socket.destroy();
        return this.socket;
    }

    public async send(message: Message): Promise<any> {
        if(this.socket.destroyed) {
            throw new Error('Socket has been closed');
        }
        this.socket.write(`${message.toString()}\n`);
    }

    public async onData(data: string): Promise<any> {
        const message = new Message(data);
        if(message.isNotification()) {
            this.emit(message.parsedMessage[0].toString());
        }
    }

    public async onError(): Promise<any> {

    }

    public async setupListener() {
        if(this.socket.destroyed) {
            throw new Error('Can\'t listen on closed socket');
        }
        this.stream = readline.createInterface({
            input: this.socket,
            terminal: false
        });
        let skip = 0;
        this.stream.on('line', (line) => {
            // Hack to skip the useless welcome message
            if(skip++ <= 2) {
                return;
            }
            line.length && this.onData(line.toString());
        });
    }

}