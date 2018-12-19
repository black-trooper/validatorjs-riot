const Validator = require('validatorjs')

class ValidatorjsRiot extends Validator {

  constructor(refs, option) {
    const v = super({}, {})
    const data = {}
    const rules = {}
    const attributeNames = {}
    this._option = option || {}
    const fieldName = this._option.field_name || 'ref-label'

    for (const name in refs) {
      if (!refs.hasOwnProperty(name)) {
        continue
      }
      const ref = refs[name]
      let attributes = ref.attributes
      if (!attributes && ref.root) {
        attributes = ref.root.attributes
      }
      if (!this._isTarget(name)) {
        continue
      }
      data[name] = this._prepareData(ref.value, attributes.type)
      rules[name] = this._prepareRule(attributes)
      if (attributes[fieldName]) {
        attributeNames[name] = attributes[fieldName].nodeValue
      }
    }
    v.input = data
    v.rules = super._parseRules(rules)
    v.setAttributeNames(attributeNames)
  }

  _prepareData(value, type) {
    if (!value) {
      return value
    }
    if (type && type.nodeValue == "number") {
      return parseFloat(value)
    }
    return value
  }

  _prepareRule(attributes) {
    const rule = []
    if (attributes.validate && attributes.validate.nodeValue) {
      const value = attributes.validate.nodeValue
      if (value.indexOf('|') >= 0) {
        Array.prototype.push.apply(rule, value.split('|'))
      } else {
        rule.push(value)
      }
    }
    if (attributes.required) {
      rule.push('required')
    }
    if (attributes.min && attributes.min.nodeValue) {
      rule.push(`min:${attributes.min.nodeValue}`)
    }
    if (attributes.max && attributes.max.nodeValue) {
      rule.push(`max:${attributes.max.nodeValue}`)
    }
    if (attributes.pattern && attributes.pattern.nodeValue) {
      rule.push(`regex:${attributes.pattern.nodeValue}`)
    }
    return rule
  }

  _isTarget(ref) {
    const target = this._option.target || []
    const expect = this._option.expect || []
    if (target.length > 0 && target.indexOf(ref) < 0) {
      return false
    }
    if (expect.length > 0 && expect.indexOf(ref) >= 0) {
      return false
    }
    return true
  }

  static useLang(lang) {
    Validator.useLang(lang)
  }
}
module.exports = ValidatorjsRiot