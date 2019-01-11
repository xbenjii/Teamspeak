import test from 'ava';

import { Command } from '../src/Command';

test('command should init', t => {
    t.notThrows(() => {
        const command = new Command('serverlist');
    });
});

test('command without params should parse into string', t => {
    const command = new Command('serverlist');
    t.is(command.build(), 'serverlist');
});

test('command with string params should parse into string', t => {
    const command = new Command('clientlist', [{options: ['uid', 'away']}]);
    t.is(command.build(), 'clientlist -uid -away');
});

test('command with object params should parse into string', t => {
    const command = new Command('clientdbfind', [{pattern: 'FPMPSC6MXqXq751dX7BKV0JniSo'}]);
    t.is(command.build(), 'clientdbfind pattern=FPMPSC6MXqXq751dX7BKV0JniSo');
});

test('command with mixed params should parse into string', t => {
    const command = new Command('clientkick', [{pattern: 'FPMPSC6MXqXq751dX7BKV0JniSo', options: ['uid']}]);
    t.is(command.build(), 'clientkick pattern=FPMPSC6MXqXq751dX7BKV0JniSo -uid');
});

test('command with mixed array object params should join on pipe', t => {
    const command = new Command('clientkick', [{clid: 1}, {clid: 2}, {clid: 3, reasonid: 5, reasonmsg: 'Go away!'}]);
    t.is(command.build(), 'clientkick clid=1|clid=2|clid=3 reasonid=5 reasonmsg=Go\\saway!');
});

test('command should escape params', t => {
    const command = new Command('sendtextcommand', [{targetmode: 2, target: 12, msg: 'Hello World!'}]);
    t.is(command.build(), 'sendtextcommand targetmode=2 target=12 msg=Hello\\sWorld!');
});