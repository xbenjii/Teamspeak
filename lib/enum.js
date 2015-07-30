'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EnumSymbol = (function () {
	function EnumSymbol(name, _ref2) {
		var value = _ref2.value;
		var _ref2$description = _ref2.description;
		var description = _ref2$description === undefined ? '' : _ref2$description;

		_classCallCheck(this, EnumSymbol);

		this.symbol = Symbol['for'](name);
		this.value = Number(value);
		this.description = String(description);
		Object.freeze(this);
	}

	_createClass(EnumSymbol, [{
		key: 'toString',
		value: function toString() {
			return this.symbol;
		}
	}, {
		key: 'valueOf',
		value: function valueOf() {
			return this.value;
		}
	}, {
		key: 'display',
		get: function get() {
			return this.description || Symbol.keyFor(this.symbol);
		}
	}]);

	return EnumSymbol;
})();

var Enum = (function () {
	function Enum(constants) {
		var _this = this;

		_classCallCheck(this, Enum);

		Object.keys(constants).forEach(function (key) {
			if (!constants[key]) throw new TypeError('enum must contain a value');
			_this[key] = new EnumSymbol(key, constants[key]);
		});
		Object.freeze(this);
	}

	_createClass(Enum, [{
		key: 'symbols',
		value: function symbols() {
			var _this2 = this;

			return (function () {
				var _ref = [];
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = Object.keys(_this2)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var key = _step.value;

						_ref.push(_this2[key]);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator['return']) {
							_iterator['return']();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return _ref;
			})();
		}
	}, {
		key: 'keys',
		value: function keys() {
			return Object.keys(this);
		}
	}, {
		key: 'contains',
		value: function contains(symbol) {
			if (!symbol instanceof EnumSymbol) return false;
			return this[Symbol.keyFor(symbol.symbol)] === symbol;
		}
	}]);

	return Enum;
})();

exports['default'] = Enum;
module.exports = exports['default'];