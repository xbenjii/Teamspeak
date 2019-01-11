import { EventEmitter } from 'events';

export interface BaseConnectionOptions {
    
}

export abstract class BaseConnection extends EventEmitter {

    constructor() {
        super();
    }

    public abstract connect(options: BaseConnectionOptions): Promise<void>;
}