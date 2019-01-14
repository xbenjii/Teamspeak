import { TelnetConnection, SSHConnection } from './Connections';

export enum TeamspeakConnectionType {
    TelnetConnection,
    SSHConnection
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
        if(options.connectionType === TeamspeakConnectionType.TelnetConnection) {
            this.connection = new TelnetConnection({ host: options.host, port: options.port});
        } else if(options.connectionType === TeamspeakConnectionType.SSHConnection) {
            this.connection = new SSHConnection({ host: options.host, port: options.port});
        }
        this.connection.connect();
    }


}