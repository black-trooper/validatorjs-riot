const Validator = require('validatorjs')

class ValidatorjsRiot extends Validator {

  constructor(refs, option) {
    const v = super({}, {})
    const data = {}
    const rules = {}
    const attributeNames = {}
    const customMessages = {}
    this._option = option || {}
    const fieldName = this._option.field_name || 'ref-label'
    const customMessageAttributeName = this._option.custom_message_attribute_name || 'custom-message'

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
      if (attributes[customMessageAttributeName]) {
        const value = attributes[customMessageAttributeName].nodeValue
        try {
          const obj = JSON.parse(value)
          Object.keys(obj).forEach(key => {
            customMessages[`${key}.${name}`] = obj[key]
          })
        } catch (e) {
          if (value.indexOf(':') > 0) {
            const array = value.split(':')
            customMessages[`${array[0]}.${name}`] = array[1]
          } else {
            customMessages[`regex.${name}`] = value
          }
        }
      }
    }
    v.input = data
    v.rules = super._parseRules(rules)
    v.messages._setCustom(customMessages);
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
    const except = this._option.except || []
    if (target.length > 0 && target.indexOf(ref) < 0) {
      return false
    }
    if (except.length > 0 && except.indexOf(ref) >= 0) {
      return false
    }
    return true
  }

  static useLang(lang) {
    Validator.useLang(lang)
  }
}
module.exports = ValidatorjsRiot