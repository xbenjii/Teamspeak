import { TelnetConnection, SSHConnection } from './Connections';

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

    constructor(options: TeamspeakOptions) {
        this.options = options;
        this.connection = new TeamspeakConnection[options.connectionType]({ host: options.host, port: options.port });
    }

    connect(): Promise<any> {
        return this.connection.connect();
    }

}