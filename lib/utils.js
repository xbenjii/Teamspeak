'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var escape = function escape(string) {
	return string.replace(/[\\\/\n\r\t\v\f]/g, '\\$&').replace(/\|/g, '\\p').replace(/ /g, '\\s');
};

var unEscape = function unEscape(string) {
	return string.replace(/\\s/g, ' ').replace(/\\p/, '|').replace(/[\\]/g, '$&');
};

var buildCommand = function buildCommand(command) {
	var params = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	var cmd = escape(command) + ' ';
	if (typeof params === 'string') {
		cmd += escape(params);
	} else if (Array.isArray(params)) {
		cmd += params.join(' ');
	} else if (typeof params === 'object') {
		cmd += Object.keys(params).map(function (key) {
			if (Array.isArray(params[key])) {
				return params[key].map(function (p) {
					return escape(key) + '=' + escape(p);
				}).join('|');
			}
			return escape(key) + '=' + escape(params[key]);
		}).join(' ');
	}
	return cmd;
};

var parseResponse = function parseResponse(data) {
	var parsed = data.split('|').map(function (group) {
		return group.split(' ').reduce(function (obj, val) {
			var _val$split = val.split('=');

			var _val$split2 = _slicedToArray(_val$split, 2);

			var k = _val$split2[0];
			var v = _val$split2[1];

			obj[k] = v ? unEscape(v) : '';
			return obj;
		}, {});
	});
	if (Array.isArray(parsed) && parsed.length === 1) {
		return parsed[0];
	}
	return parsed;
};

exports['default'] = { escape: escape, unEscape: unEscape, buildCommand: buildCommand, parseResponse: parseResponse };
module.exports = exports['default'];