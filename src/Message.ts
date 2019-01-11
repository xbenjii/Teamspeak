import { unescape } from './utils';

export type MessageObject = { [key: string]: string | number | Array<string | number> };

export class Message {

    private rawMessage: string = '';

    constructor(rawMessage: string) {
        this.rawMessage = rawMessage;
    }

    parse(): any {
        return this.rawMessage.split('|').map(group => {
            return group.split(' ').map(val => {
                const [key, value] = val.split('=');
                if(value === undefined) {
                    return key;
                }
                return { [key]: value };
            });
        });
    }

    toString() {
        return this.rawMessage;
    }
}