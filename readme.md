#Teamspeak
### A node library to connect and administrate your Teamspeak 3 server


##Example
```
import {Client} from 'teamspeak';

let ts3 = new Client('myDomainOrIp.com', 10011);

ts3.authenticate('username', 'password')
	.then(() => ts3.send('use', '1')) //Use virtual server with ID=1
	.then(() => ts3.send('servernotifyregister', {event: 'server'}))
	.then(() => ts3.send('clientlist'))
	.then(clients => console.log(clients));

/* Will return a response like:
{ notifycliententerview: '',
  cfid: '0',
  ctid: '1',
  reasonid: '0',
  clid: '26',
  client_unique_identifier: 'r7fl2mYBbFm+A8TYaGLBK6dMDWA',
  client_nickname: 'ben',
  client_input_muted: '0',
  client_output_muted: '0',
  client_outputonly_muted: '0',
  client_input_hardware: '1',
  client_output_hardware: '1',
  client_meta_data: '',
  client_is_recording: '0',
  client_database_id: '28',
  client_channel_group_id: '8',
  client_servergroups: '6',
  client_away: '0',
  client_away_message: '',
  client_type: '0',
  client_flag_avatar: '',
  client_talk_power: '75',
  client_talk_request: '0',
  client_talk_request_msg: '',
  client_description: '',
  client_is_talker: '0',
  client_is_priority_speaker: '0',
  client_unread_messages: '0',
  client_nickname_phonetic: '',
  client_needed_serverquery_view_power: '75',
  client_icon_id: '0',
  client_is_channel_commander: '0',
  client_country: 'GB',
  client_channel_group_inherited_channel_id: '1',
  client_badges: 'Overwolf' }
  */
ts3.on('cliententerview', response => console.log(response));

// You can also listen on all events.
ts3.on('*', response => console.log(response));

```