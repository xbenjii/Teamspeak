'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _events = require('events');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _byline = require('byline');

var _byline2 = _interopRequireDefault(_byline);

var _enum = require('./enum');

var _enum2 = _interopRequireDefault(_enum);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var TS3 = (function (_EventEmitter) {
	function TS3() {
		var host = arguments.length <= 0 || arguments[0] === undefined ? 'localhost' : arguments[0];

		var _this = this;

		var port = arguments.length <= 1 || arguments[1] === undefined ? 10011 : arguments[1];
		var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

		_classCallCheck(this, TS3);

		_get(Object.getPrototypeOf(TS3.prototype), 'constructor', this).call(this, _events.EventEmitter);
		this.host = host;
		this.port = port;
		this.options = options;

		this.socket = _net2['default'].connect(this.port, this.host);
		this.connected = new _bluebird2['default'](function (resolve, reject) {
			_this.socket.on('connect', resolve);
			_this.socket.on('error', function (error) {
				_this.emit('error', error);
			});
		}).then(function () {
			_this.reader = _byline2['default'].createStream(_this.socket, { encoding: 'utf-8', keepEmptyLines: false });
			_this.reader.on('data', _this.onData.bind(_this));
		});

		this._openRequests = 0;
		this._promiseChain = this.connected;
		this._skippedWelcome = -2;
		this._response = null;
	}

	_inherits(TS3, _EventEmitter);

	_createClass(TS3, [{
		key: 'onData',
		value: function onData(line) {
			this._openRequests--;
			if (!this._openRequests) this._promiseChain = this.connected;
			if (this._skippedWelcome < 0) {
				this._skippedWelcome++;
				return;
			}
			line = line.trim();
			this.debug('[RECEIVED] ' + line + ' for {' + this.promise.command + '}');
			if (line.indexOf('error') !== -1) {
				var response = _utils2['default'].parseResponse(line);
				if (response.error && response.msg !== 'ok') {
					response.command = this.promise.command;
					this.promise.reject(response);
				} else {
					if (this._response) {
						this.promise.resolve(this._response);
					} else {
						this.promise.resolve(response);
					}
				}
			} else if (line.indexOf('notify') !== -1) {
				var notification = line.substr('notify'.length);
				this.emit(notification.substr(notification, notification.indexOf(' ')), _utils2['default'].parseResponse(line));
				this.emit('*', _utils2['default'].parseResponse(line));
			} else {
				this._response = _utils2['default'].parseResponse(line);
			}
		}
	}, {
		key: 'send',
		value: function send(command) {
			var _this2 = this;

			var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			this._openRequests++;
			this._promiseChain = this._promiseChain.then(function () {
				return new _bluebird2['default'](function (resolve, reject) {
					_this2.promise = { resolve: resolve, reject: reject, command: command };
					var builtCommand = _utils2['default'].buildCommand(command, data);
					_this2.debug('[SENT] ' + builtCommand);
					_this2.socket.write(builtCommand + '\n');
				});
			});
			return this._promiseChain;
		}
	}, {
		key: 'authenticate',
		value: function authenticate(username, password) {
			return this.send('login', [username, password]);
		}
	}, {
		key: 'debug',
		value: function debug(message) {
			if (typeof this.options.debug === 'function') this.options.debug(message);
		}
	}]);

	return TS3;
})(_events.EventEmitter);

var HostMessageMode = new _enum2['default']({
	LOG: { value: 1 },
	MODAL: { value: 2 },
	MODALQUIT: { value: 3 }
});

exports.HostMessageMode = HostMessageMode;
var TextMessageTargetMode = new _enum2['default']({
	CLIENT: { value: 1 },
	CHANNEL: { value: 2 },
	SERVER: { value: 3 }
});

exports.TextMessageTargetMode = TextMessageTargetMode;
var LogLevel = new _enum2['default']({
	ERROR: { value: 1 },
	WARNING: { value: 2 },
	DEBUG: { value: 3 },
	INFO: { value: 4 }
});

exports.LogLevel = LogLevel;
var ReasonIdentifier = new _enum2['default']({
	KICK_CHANNEL: { value: 4 },
	KICK_SERVER: { value: 5 }
});

exports.ReasonIdentifier = ReasonIdentifier;
var PermissionGroupTypes = new _enum2['default']({
	SERVERGROUP: { value: 0 },
	GLOBALCLIENT: { value: 1 },
	CHANNEL: { value: 2 },
	CHANNELGROUP: { value: 3 },
	CHANNELCLIENT: { value: 4 }
});

exports.PermissionGroupTypes = PermissionGroupTypes;
var TokenType = new _enum2['default']({
	SERVERGROUP: { value: 0 },
	CHANNELGROUP: { value: 1 }
});

exports.TokenType = TokenType;
exports.Client = TS3;