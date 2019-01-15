import { Teamspeak, TeamspeakOptions, TeamspeakConnectionType } from './src';

const ts3 = new Teamspeak(<TeamspeakOptions>{
    connectionType: TeamspeakConnectionType.Telnet,
    host: 'localhost',
    port: 10011
});