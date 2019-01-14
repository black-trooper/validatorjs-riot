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

const Validator = __webpack_require__(/*! validatorjs */ "validatorjs");

class ValidatorjsRiot extends Validator {
  constructor(refs, option) {
    const v = super({}, {});
    const data = {};
    const rules = {};
    const attributeNames = {};
    this._option = option || {};
    const fieldName = this._option.field_name || 'ref-label';

    for (const name in refs) {
      if (!refs.hasOwnProperty(name)) {
        continue;
      }

      const ref = refs[name];
      let attributes = ref.attributes;

      if (!attributes && ref.root) {
        attributes = ref.root.attributes;
      }

      if (!this._isTarget(name)) {
        continue;
      }

      data[name] = this._prepareData(ref.value, attributes.type);
      rules[name] = this._prepareRule(attributes);

      if (attributes[fieldName]) {
        attributeNames[name] = attributes[fieldName].nodeValue;
      }
    }

    v.input = data;
    v.rules = super._parseRules(rules);
    v.setAttributeNames(attributeNames);
  }

  _prepareData(value, type) {
    if (!value) {
      return value;
    }

    if (type && type.nodeValue == "number") {
      return parseFloat(value);
    }

    return value;
  }

  _prepareRule(attributes) {
    const rule = [];

    if (attributes.validate && attributes.validate.nodeValue) {
      const value = attributes.validate.nodeValue;

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
      rule.push(`min:${attributes.min.nodeValue}`);
    }

    if (attributes.max && attributes.max.nodeValue) {
      rule.push(`max:${attributes.max.nodeValue}`);
    }

    if (attributes.pattern && attributes.pattern.nodeValue) {
      rule.push(`regex:${attributes.pattern.nodeValue}`);
    }

    return rule;
  }

  _isTarget(ref) {
    const target = this._option.target || [];
    const except = this._option.except || [];

    if (target.length > 0 && target.indexOf(ref) < 0) {
      return false;
    }

    if (except.length > 0 && except.indexOf(ref) >= 0) {
      return false;
    }

    return true;
  }

  static useLang(lang) {
    Validator.useLang(lang);
  }

}

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