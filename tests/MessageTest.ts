import test from 'ava';

import { Message } from '../src/Message';

test('message should init', t => {
    t.notThrows(() => {
        const message = new Message('instanceinfo');
    });
});

test('message with params should parse into array', t => {
    const message = new Message('serverinstance_database_version=11 serverinstance_filetransfer_port=30033');
    t.deepEqual(message.parse(), [
        {
            serverinstance_database_version: '11',
            serverinstance_filetransfer_port: '30033'
        }
    ]);
});

test('message with array response should parse into array', t => {
    const message = new Message('sgid=9 name=Server\\sAdmin type=1 iconid=300 savedb=1|sgid=10 name=Normal type=1 iconid=0 savedb=1|sgid=11');
    t.deepEqual(message.parse(), [
        {
            sgid: '9',
            name: 'Server Admin',
            type: '1',
            iconid: '300',
            savedb: '1'
        },
        {
            sgid: '10',
            name: 'Normal',
            type: '1',
            iconid: '0',
            savedb: '1'
        },
        {
            sgid: '11'
        }
    ]);
});