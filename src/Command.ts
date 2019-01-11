import { escape } from './utils';

export type CommandObject = { [key: string]: string | number | Array<string | number> };
export type CommandParams = Array<CommandObject>;

export class Command {

    private command: string = '';
    private params?: CommandParams;

    constructor(command: string, params?: CommandParams) {
        this.command = command;
        this.params = params;
    }

    build(): string {
        let response = `${escape(this.command)}`;
        if (this.params !== undefined) {
            response += ' ';
            response += this.params.map(param => { 
                const params = Object.keys(param).map(key => {
                    const val = param[key];
                    if (typeof val === 'string') {
                        return `${key}=${escape(val)}`;
                    } else if (typeof val === 'number') {
                        return `${key}=${val}`;
                    }
                }).join(' ');
                if (Array.isArray(param.options)) {
                    return params + param.options.map(v => '-' + v).join(' ');
                }
                return params;
            }).join('|');
        }
        return response;
    }

    toString(): string {
        return this.build();
    }

};