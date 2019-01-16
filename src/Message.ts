import { unescape } from './utils';

export type MessageObject = { [key: string]: string | number | Array<string | number> };
export type MessageArgs = Array<MessageObject>;

export class Message {

    private rawMessage: string = '';
    public parsedMessage!: MessageArgs;

    constructor(rawMessage: string) {
        this.rawMessage = rawMessage;
        this.parse();
    }

    parse(): MessageArgs {
        this.parsedMessage = this.rawMessage.split('|').map(group => {
            return group.split(' ').reduce((obj, val) => {
                const [key, value] = val.split('=');
                obj[key] = (value !== undefined) ? unescape(value) : '';
                return obj;
            }, <MessageObject>{});
        });
        return this.parsedMessage;
    }

    isNotification(): boolean {
        return Array.isArray(this.parsedMessage) && this.parsedMessage[0].toString().includes('notify');
    }

    toString() {
        return this.rawMessage;
    }
}