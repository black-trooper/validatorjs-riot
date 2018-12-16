const Validator = require('../src/index');

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
      <input type="text" ref="field4" pattern="regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/" value="10,000.001" />
      `)
    const v = new Validator(tag.refs)
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    expect(v.errors.first('field1')).to.be.not.null
    expect(v.errors.first('field2')).to.be.not.null
    expect(v.errors.first('field3')).to.be.not.null
    expect(v.errors.first('field4')).to.be.not.null
  })

  it('target option', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/" value="10,000.001" />
      `)
    const v = new Validator(tag.refs, { target: ['field1'] })
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    expect(v.errors.first('field1')).to.be.not.null
    v.errors.first('field2').should.equal(false)
    v.errors.first('field3').should.equal(false)
    v.errors.first('field4').should.equal(false)
  })

  it('expect option', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/" value="10,000.001" />
      `)
    const v = new Validator(tag.refs, { expect: ['field1'] })
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    v.errors.first('field1').should.equal(false)
    expect(v.errors.first('field2')).to.be.not.null
    expect(v.errors.first('field3')).to.be.not.null
    expect(v.errors.first('field4')).to.be.not.null
  })

  it('validate attribute', () => {
    mount(`
      <input type="text" ref="field1" validate="required" />
      <input type="number" ref="field2" validate="max:3" value="10" />
      <input type="number" ref="field3" validate="min:3" value="2" />
      `)
    const v = new Validator(tag.refs)
    v.fails().should.equal(true)
    v.passes().should.equal(false)
    expect(v.errors.first('field1')).to.be.not.null
    expect(v.errors.first('field2')).to.be.not.null
    expect(v.errors.first('field3')).to.be.not.null
  })
})
