import { connect, Socket } from 'net';

import { BaseConnection, BaseConnectionOptions } from './BaseConnection';
import { Message } from '../Message';

export interface SSHConnectionOptions extends BaseConnectionOptions {
    host: string,
    port: number
}

export class SSHConnection extends BaseConnection {

    private options: SSHConnectionOptions
    private socket!: Socket;

    constructor(options: SSHConnectionOptions) {
        super();
        this.options = options;
    }

    public async connect(): Promise<any> {

    }

    public async close(): Promise<any> {

    }

    public async send(message: Message): Promise<any> {

    }

    public async onData(data: string): Promise<any> {

    }

    public async onError(): Promise<any> {

    }

    public async setupListener() {

    }

}