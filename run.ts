import { Teamspeak, TeamspeakOptions, TeamspeakConnectionType } from './src';

const ts3 = new Teamspeak(<TeamspeakOptions>{
    connectionType: TeamspeakConnectionType.TelnetConnection,
    host: 'localhost',
    port: 10011
});