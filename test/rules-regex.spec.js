import Validator from '../src/index'
import AppTest from './tag/regex.riot'
import { expect } from 'chai'
import { component } from 'riot'

describe('rules-regex', function () {
  it('regex', () => {
    const div = document.createElement('div')
    const tag = component(AppTest)(div)
    const v = new Validator(tag.$$('[ref]'))

    expect(v.fails()).equal(true)
    expect(v.passes()).equal(false)

    expect(v.errors.first('field1')).equal('The field1 format is invalid.')
    expect(v.errors.first('field2')).equal(false)
    expect(v.errors.first('field3')).equal('The field3 format is invalid.')
    expect(v.errors.first('field4')).equal(false)
    expect(v.errors.first('field5')).equal(false)

    tag.unmount()
  })
})
