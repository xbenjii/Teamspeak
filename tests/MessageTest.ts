import test from 'ava';

import { Message } from '../src/Message';

test('message should init', t => {
    t.notThrows(() => {
        const message = new Message('instanceinfo');
    });
});

test('message with params should parse into object', t => {
    const message = new Message('serverinstance_database_version=11 serverinstance_filetransfer_port=30033');
    t.is(message.parse(), [
        {
            serverinstance_database_version: '11',
            serverinstance_filetransfer_port: '30033'
        }
    ]);
});