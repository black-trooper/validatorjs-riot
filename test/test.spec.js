import Validator from '../src/index'
import AppTest from './tag/test.riot'
import { expect } from 'chai'
import { component } from 'riot'

describe('test', function () {
  let tag

  const mount = target => {
    const div = document.createElement('div')
    div.insertAdjacentHTML('beforeend', target)
    tag = component(AppTest)(div)
  }

  afterEach(function () {
    tag.unmount()
  })

  it('custom tag', () => {
    mount(`
      <input-field ref="field1" required />
      <input-field ref="field2" required value="1" />
      `)
    const v = new Validator(tag.$$('[ref]'))
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('The field1 field is required.')
    expect(v.errors.first('field2')).equal(false)
  })

  it('html5 attribute', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      <input type="checkbox" ref="field5" required />
      <input type="checkbox" ref="field6" required checked value="1" />
      `)
    const v = new Validator(tag.$$('[ref]'))
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('The field1 field is required.')
    expect(v.errors.first('field2')).equal('The field2 may not be greater than 3.')
    expect(v.errors.first('field3')).equal('The field3 must be at least 3.')
    expect(v.errors.first('field4')).equal('The field4 format is invalid.')
    expect(v.errors.first('field5')).equal('The field5 field is required.')
    expect(v.errors.first('field6')).equal(false)
  })

  it('target option', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    const v = new Validator(tag.$$('[ref]'), { target: ['field1'] })
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('The field1 field is required.')
    expect(v.errors.first('field2')).equal(false)
    expect(v.errors.first('field3')).equal(false)
    expect(v.errors.first('field4')).equal(false)
  })

  it('except option', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    const v = new Validator(tag.$$('[ref]'), { except: ['field1'] })
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal(false)
    expect(v.errors.first('field2')).equal('The field2 may not be greater than 3.')
    expect(v.errors.first('field3')).equal('The field3 must be at least 3.')
    expect(v.errors.first('field4')).equal('The field4 format is invalid.')
  })

  it('validate attribute', () => {
    mount(`
      <input type="text" ref="field1" validate="required|email" />
      <input type="number" ref="field2" validate="max:3" value="10" />
      <input type="number" ref="field3" validate="min:3" value="2" />
      <input type="text" ref="field4" validate="regex:/^[0-9]?$/" value="11" />
      `)
    const v = new Validator(tag.$$('[ref]'))
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)

    expect(v.errors.first('field1')).equal('The field1 field is required.')
    expect(v.errors.first('field2')).equal('The field2 may not be greater than 3.')
    expect(v.errors.first('field3')).equal('The field3 must be at least 3.')
    expect(v.errors.first('field4')).equal('The field4 format is invalid.')
  })

  it('use language', () => {
    mount(`
      <input type="text" ref="field1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.$$('[ref]'))
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('field1は必須です。')
    expect(v.errors.first('field2')).equal('field2は3以下で入力してください。')
    expect(v.errors.first('field3')).equal('field3は3以上で入力してください。')
    expect(v.errors.first('field4')).equal('field4の値はパターンにマッチする必要があります。')
  })

  it('custome attribute names', () => {
    mount(`
      <input type="text" ref="field1" ref-label="フィールド1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.$$('[ref]'))
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('フィールド1は必須です。')
    expect(v.errors.first('field2')).equal('field2は3以下で入力してください。')
    expect(v.errors.first('field3')).equal('field3は3以上で入力してください。')
    expect(v.errors.first('field4')).equal('field4の値はパターンにマッチする必要があります。')
  })

  it('option key name', () => {
    mount(`
      <input type="text" hoge="field1" required />
      <input type="number" hoge="field2" max="3" value="10" />
      <input type="number" hoge="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.$$('input'), { key_name: 'hoge' })
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('field1は必須です。')
    expect(v.errors.first('field2')).equal('field2は3以下で入力してください。')
    expect(v.errors.first('field3')).equal('field3は3以上で入力してください。')
    expect(v.errors.first('field4')).equal(false)
  })

  it('option field name', () => {
    mount(`
      <input type="text" ref="field1" hoge="フィールド1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.$$('[ref]'), { field_name: 'hoge' })
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('フィールド1は必須です。')
    expect(v.errors.first('field2')).equal('field2は3以下で入力してください。')
    expect(v.errors.first('field3')).equal('field3は3以上で入力してください。')
    expect(v.errors.first('field4')).equal('field4の値はパターンにマッチする必要があります。')
  })

  it('setAttributeNames', () => {
    mount(`
      <input type="text" ref="field1" ref-label="フィールド1" required />
      <input type="number" ref="field2" max="3" value="10" />
      <input type="number" ref="field3" min="3" value="2" />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.$$('[ref]'))
    v.setAttributeNames({ field2: 'フィールド2' })
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('field1は必須です。')
    expect(v.errors.first('field2')).equal('フィールド2は3以下で入力してください。')
    expect(v.errors.first('field3')).equal('field3は3以上で入力してください。')
    expect(v.errors.first('field4')).equal('field4の値はパターンにマッチする必要があります。')
  })


  it('custom-message', () => {
    mount(`
      <input type="text" ref="field1" custom-message="required:入力してください" required />
      <input type="number" ref="field2" max="3" value="10" custom-message="required:入力してください" />
      <input type="number" ref="field3" min="3" value="2" custom-message="入力してください"  />
      <input type="text" ref="field4" pattern="/^[0-9]?$/" custom-message="0から9までの数字を入力してください" value="11" />
      <input type="text" ref="field5" required pattern="/^[0-9]?$/" custom-message='{"required":"入力してください", "regex":"0から9までの数字を入力してください"}' />
      <input type="text" ref="field6" required pattern="/^[0-9]?$/" custom-message="{&quot;required&quot;:&quot;入力してください&quot;, &quot;regex&quot;:&quot;0から9までの数字を入力してください&quot;}" value="11" />
      `)
    Validator.useLang('ja')
    const v = new Validator(tag.$$('[ref]'))
    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)
    expect(v.errors.first('field1')).equal('入力してください')
    expect(v.errors.first('field2')).equal('field2は3以下で入力してください。')
    expect(v.errors.first('field3')).equal('field3は3以上で入力してください。')
    expect(v.errors.first('field4')).equal('0から9までの数字を入力してください')
    expect(v.errors.first('field5')).equal('入力してください')
    expect(v.errors.first('field6')).equal('0から9までの数字を入力してください')
  })
})
