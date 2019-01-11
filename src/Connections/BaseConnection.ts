import { EventEmitter } from 'events';

import { Message } from '../Message';

export interface BaseConnectionOptions {
    
}

export abstract class BaseConnection extends EventEmitter {

    constructor() {
        super();
    }

    public abstract async connect(options: BaseConnectionOptions): Promise<any>;

    public abstract async close(): Promise<any>;

    public abstract async send(message: Message): Promise<any>;

    public abstract async onData(data: string): Promise<Message>;

    public abstract async onError(): Promise<any>;
}