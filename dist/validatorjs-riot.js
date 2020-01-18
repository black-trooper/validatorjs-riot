(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("validatorjs"));
	else if(typeof define === 'function' && define.amd)
		define(["validatorjs"], factory);
	else if(typeof exports === 'object')
		exports["ValidatorjsRiot"] = factory(require("validatorjs"));
	else
		root["ValidatorjsRiot"] = factory(root["validatorjs"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_validatorjs__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Validator = __webpack_require__(/*! validatorjs */ "validatorjs");

var ValidatorjsRiot =
/*#__PURE__*/
function (_Validator) {
  _inherits(ValidatorjsRiot, _Validator);

  function ValidatorjsRiot(refs, option) {
    var _this;

    _classCallCheck(this, ValidatorjsRiot);

    var v = _this = _possibleConstructorReturn(this, _getPrototypeOf(ValidatorjsRiot).call(this, {}, {}));

    var data = {};
    var rules = {};
    var attributeNames = {};
    var customMessages = {};
    _this._option = option || {};
    var fieldName = _this._option.field_name || 'ref-label';
    var customMessageAttributeName = _this._option.custom_message_attribute_name || 'custom-message';

    var _loop = function _loop(name) {
      if (!refs.hasOwnProperty(name)) {
        return "continue";
      }

      var ref = refs[name];
      var attributes = ref.attributes;

      if (!attributes && ref.root) {
        attributes = ref.root.attributes;
      }

      if (!_this._isTarget(name)) {
        return "continue";
      }

      data[name] = _this._prepareData(ref.value, attributes.type);
      rules[name] = _this._prepareRule(attributes);

      if (attributes[fieldName]) {
        attributeNames[name] = attributes[fieldName].nodeValue;
      }

      if (attributes[customMessageAttributeName]) {
        var value = attributes[customMessageAttributeName].nodeValue;

        try {
          var obj = JSON.parse(value);
          Object.keys(obj).forEach(function (key) {
            customMessages["".concat(key, ".").concat(name)] = obj[key];
          });
        } catch (e) {
          if (value.indexOf(':') > 0) {
            var array = value.split(':');
            customMessages["".concat(array[0], ".").concat(name)] = array[1];
          } else {
            customMessages["regex.".concat(name)] = value;
          }
        }
      }
    };

    for (var name in refs) {
      var _ret = _loop(name);

      if (_ret === "continue") continue;
    }

    v.input = data;
    v.rules = _get(_getPrototypeOf(ValidatorjsRiot.prototype), "_parseRules", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), rules);

    v.messages._setCustom(customMessages);

    v.setAttributeNames(attributeNames);
    return _this;
  }

  _createClass(ValidatorjsRiot, [{
    key: "_prepareData",
    value: function _prepareData(value, type) {
      if (!value) {
        return value;
      }

      if (type && type.nodeValue == "number") {
        return parseFloat(value);
      }

      return value;
    }
  }, {
    key: "_prepareRule",
    value: function _prepareRule(attributes) {
      var rule = [];

      if (attributes.validate && attributes.validate.nodeValue) {
        var value = attributes.validate.nodeValue;

        if (value.indexOf('|') >= 0) {
          Array.prototype.push.apply(rule, value.split('|'));
        } else {
          rule.push(value);
        }
      }

      if (attributes.required) {
        rule.push('required');
      }

      if (attributes.min && attributes.min.nodeValue) {
        rule.push("min:".concat(attributes.min.nodeValue));
      }

      if (attributes.max && attributes.max.nodeValue) {
        rule.push("max:".concat(attributes.max.nodeValue));
      }

      if (attributes.pattern && attributes.pattern.nodeValue) {
        rule.push("regex:".concat(attributes.pattern.nodeValue));
      }

      return rule;
    }
  }, {
    key: "_isTarget",
    value: function _isTarget(ref) {
      var target = this._option.target || [];
      var except = this._option.except || [];

      if (target.length > 0 && target.indexOf(ref) < 0) {
        return false;
      }

      if (except.length > 0 && except.indexOf(ref) >= 0) {
        return false;
      }

      return true;
    }
  }], [{
    key: "useLang",
    value: function useLang(lang) {
      Validator.useLang(lang);
    }
  }]);

  return ValidatorjsRiot;
}(Validator);

module.exports = ValidatorjsRiot;

/***/ }),

/***/ "validatorjs":
/*!******************************!*\
  !*** external "validatorjs" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_validatorjs__;

/***/ })

/******/ });
});