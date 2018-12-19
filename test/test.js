const Validator = require('../src/index')

describe('test', function () {
  let tag

  const mount = target => {
    riot.tag('test', target)
    $('body').append('<test></test>')
    tag = riot.mount('test')[0]
  }

  afterEach(function () {
    tag.unmount()
  })

  it('custom tag', () => {
    riot.tag('input-field', '<input type="text"  />')
    mount(`
      <input-field ref="field1" required />
      `)
    const v = new Validator(tag.refs)
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    expect(v.errors.first('field1')).to.be.not.null
  })

  it('html5 attribute', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    const v = new Validator(tag.refs)
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal('The field1 field is required.')
    v.errors.first('field2').should.equal('The field2 may not be greater than 3.')
    v.errors.first('field3').should.equal('The field3 must be at least 3.')
    v.errors.first('field4').should.equal('The field4 format is invalid.')
  })

  it('target option', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    const v = new Validator(tag.refs, { target: ['field1'] })
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal('The field1 field is required.')
    v.errors.first('field2').should.equal(false)
    v.errors.first('field3').should.equal(false)
    v.errors.first('field4').should.equal(false)
  })

  it('except option', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    const v = new Validator(tag.refs, { except: ['field1'] })
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal(false)
    v.errors.first('field2').should.equal('The field2 may not be greater than 3.')
    v.errors.first('field3').should.equal('The field3 must be at least 3.')
    v.errors.first('field4').should.equal('The field4 format is invalid.')
  })

  it('validate attribute', () => {
    mount(`
      <input type="text" ref="field1" validate="required|email" />
      <input type="number" ref="field2" validate="max:3" value="10" />
      <input type="number" ref="field3" validate="min:3" value="2" />
      <input type="text" ref="field4" validate="regex:/^[0-9]?$/" value="11" />
      `)
    const v = new Validator(tag.refs)
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal('The field1 field is required.')
    v.errors.first('field2').should.equal('The field2 may not be greater than 3.')
    v.errors.first('field3').should.equal('The field3 must be at least 3.')
    v.errors.first('field4').should.equal('The field4 format is invalid.')
  })

  it('use language', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.refs)
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal('field1は必須です。')
    v.errors.first('field2').should.equal('field2は3以下で入力してください。')
    v.errors.first('field3').should.equal('field3は3以上で入力してください。')
    v.errors.first('field4').should.equal('field4の値はパターンにマッチする必要があります。')
  })

  it('custome attribute names', () => {
    mount(`
      <input type="text" ref="field1" ref-label="フィールド1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.refs)
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal('フィールド1は必須です。')
    v.errors.first('field2').should.equal('field2は3以下で入力してください。')
    v.errors.first('field3').should.equal('field3は3以上で入力してください。')
    v.errors.first('field4').should.equal('field4の値はパターンにマッチする必要があります。')
  })

  it('option field name', () => {
    mount(`
      <input type="text" ref="field1" hoge="フィールド1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.refs, { field_name: 'hoge' })
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal('フィールド1は必須です。')
    v.errors.first('field2').should.equal('field2は3以下で入力してください。')
    v.errors.first('field3').should.equal('field3は3以上で入力してください。')
    v.errors.first('field4').should.equal('field4の値はパターンにマッチする必要があります。')
  })

  it('setAttributeNames', () => {
    mount(`
      <input type="text" ref="field1" ref-label="フィールド1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.refs)
    v.setAttributeNames({ field2: 'フィールド2' })
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal('field1は必須です。')
    v.errors.first('field2').should.equal('フィールド2は3以下で入力してください。')
    v.errors.first('field3').should.equal('field3は3以上で入力してください。')
    v.errors.first('field4').should.equal('field4の値はパターンにマッチする必要があります。')
    console.log(v.rules.field4)
  })
})
