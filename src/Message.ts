import { unescape } from './utils';

export type MessageObject = { [key: string]: string | number | Array<string | number> };
export type MessageArgs = Array<MessageObject>;

export class Message {

    private rawMessage: string = '';

    constructor(rawMessage: string) {
        this.rawMessage = rawMessage;
    }

    parse(): MessageArgs {
        return this.rawMessage.split('|').map(group => {
            return group.split(' ').reduce((obj, val) => {
                const [key, value] = val.split('=');
                obj[key] = (value !== undefined) ? unescape(value) : '';
                return obj;
            }, <MessageObject>{});
        });
    }

    toString() {
        return this.rawMessage;
    }
}