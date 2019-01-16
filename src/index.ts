import { TelnetConnection, SSHConnection } from './Connections';
import { CommandParams } from './Command';

export enum TeamspeakConnectionType {
    Telnet,
    SSH
};

export const TeamspeakConnection = {
    [TeamspeakConnectionType.Telnet]: TelnetConnection,
    [TeamspeakConnectionType.SSH]: SSHConnection
};

export type TeamspeakOptions = {
    connectionType: TeamspeakConnectionType,
    host: string,
    port: number
};

export class Teamspeak {

    private options: TeamspeakOptions;
    private connection!: TelnetConnection | SSHConnection;
    private activeCommand!: null;

    constructor(options: TeamspeakOptions) {
        this.options = options;
        this.connection = new TeamspeakConnection[options.connectionType]({ host: options.host, port: options.port });
    }

    connect(): Promise<any> {
        return this.connection.connect();
    }

    async send(command: CommandParams): Promise<any> {

    }

}