const Validator = require('../src/index')

describe('rules', function () {
  let tag

  const mount = target => {
    riot.tag('test', target)
    const div = document.createElement('test')
    document.body.appendChild(div)
    tag = riot.mount('test')[0]
  }

  const passes = target => {
    mount(target)
    const v = new Validator(tag.refs)
    v.fails().should.equal(false)
    v.passes().should.equal(true)
  }
  const fails = target => {
    mount(target)
    const v = new Validator(tag.refs)
    v.fails().should.equal(true)
    v.passes().should.equal(false)
  }

  afterEach(function () {
    tag.unmount()
  })


  it('accepted', () => {
    fails('<input type="text" ref="field" validate="accepted" value="0" />')
    passes('<input type="text" ref="field" validate="accepted" value="1" />')
  })

  it('after:date', () => {
    fails(`
    <input type="text" ref="date" value="1998-08-09" />
    <input type="text" ref="date2" validate="after:date" value="1994-12-09" />
    `)
    fails(`
    <input type="text" ref="date" value="1994-12-09" />
    <input type="text" ref="date2" validate="after:date" value="1994-12-09" />
    `)
    passes(`
    <input type="text" ref="date" value="1994-12-09" />
    <input type="text" ref="date2" validate="after:date" value="1998-08-09" />
    `)
  })

  it('after_or_equal:date', () => {
    fails(`
    <input type="text" ref="date" value="1998-08-09" />
    <input type="text" ref="date2" validate="after_or_equal:date" value="1994-12-09" />
    `)
    passes(`
    <input type="text" ref="date" value="1994-12-09" />
    <input type="text" ref="date2" validate="after_or_equal:date" value="1994-12-09" />
    `)
    passes(`
    <input type="text" ref="date" value="1994-12-09" />
    <input type="text" ref="date2" validate="after_or_equal:date" value="1998-08-09" />
    `)
  })

  it('alpha', () => {
    fails('<input type="text" ref="field" validate="alpha" value="12" />')
    passes('<input type="text" ref="field" validate="alpha" value="abc" />')
  })

  it('alpha_dash', () => {
    fails('<input type="text" ref="field" validate="alpha_dash" value="David *" />')
    passes('<input type="text" ref="field" validate="alpha_dash" value="David9_-" />')
  })

  it('alpha_num', () => {
    fails('<input type="text" ref="field" validate="alpha_num" value="$" />')
    passes('<input type="text" ref="field" validate="alpha_num" value="abc123" />')
  })

  it('before:date', () => {
    fails(`
    <input type="text" ref="date" value="1994-12-09" />
    <input type="text" ref="date2" validate="before:date" value="1998-08-09" />
    `)
    fails(`
    <input type="text" ref="date" value="1994-12-09" />
    <input type="text" ref="date2" validate="before:date" value="1994-12-09" />
    `)
    passes(`
    <input type="text" ref="date" value="1998-08-09" />
    <input type="text" ref="date2" validate="before:date" value="1994-12-09" />
    `)
  })

  it('before_or_equal:date', () => {
    fails(`
    <input type="text" ref="date" value="1994-12-09" />
    <input type="text" ref="date2" validate="before_or_equal:date" value="1998-08-09" />
    `)
    passes(`
    <input type="text" ref="date" value="1994-12-09" />
    <input type="text" ref="date2" validate="before_or_equal:date" value="1994-12-09" />
    `)
    passes(`
    <input type="text" ref="date" value="1998-08-09" />
    <input type="text" ref="date2" validate="before_or_equal:date" value="1994-12-09" />
    `)
  })

  it('between:min,max', () => {
    fails('<input type="number" ref="field" validate="between:1,3" value="5" />')
    passes('<input type="number" ref="field" validate="between:1,3" value="3" />')
  })

  it('boolean', () => {
    fails('<input type="text" ref="field" validate="boolean" value="2" />')
    passes('<input type="text" ref="field" validate="boolean" value="1" />')
  })

  it('confirmed', () => {
    fails(`
    <input type="text" ref="password" validate="confirmed" value="0" />
    <input type="text" ref="password_confirmation" value="1" />
    `)
    passes(`
    <input type="text" ref="password" validate="confirmed" value="0" />
    <input type="text" ref="password_confirmation" value="0" />
    `)
  })

  it('date', () => {
    fails('<input type="text" ref="field" validate="date" value="0908 1995" />')
    passes('<input type="text" ref="field" validate="date" value="2018-11-11" />')
  })

  it('digits:value', () => {
    fails('<input type="text" ref="field" validate="digits:2" value="1" />')
    passes('<input type="text" ref="field" validate="digits:2" value="13" />')
  })

  it('different:attribute', () => {
    fails(`
    <input type="text" ref="field1" value="0" />
    <input type="text" ref="field2" validate="different:field1" value="0" />
    `)
    passes(`
    <input type="text" ref="field1" value="0" />
    <input type="text" ref="field2" validate="different:field1" value="1" />
    `)
  })

  it('email', () => {
    fails('<input type="text" ref="field" validate="email" value="johndoe.gmail.com" />')
    passes('<input type="text" ref="field" validate="email" value="johndoe@gmail.com" />')
  })

  it('hex', () => {
    fails('<input type="text" ref="field" validate="hex" value="4d4b8z" />')
    passes('<input type="text" ref="field" validate="hex" value="54759eb3c090d83494e2d804" />')
  })

  it('in:foo,bar,...', () => {
    fails('<input type="text" ref="field" validate="in:CA,TX,FL" value="fakeState" />')
    passes('<input type="text" ref="field" validate="in:CA,TX,FL" value="CA" />')
  })

  it('integer', () => {
    fails('<input type="text" ref="field" validate="integer" value="integer" />')
    passes('<input type="text" ref="field" validate="integer" value="18" />')
  })

  it('max:value', () => {
    fails('<input type="text" ref="field" validate="max:3" value="David" />')
    passes('<input type="text" ref="field" validate="max:5" value="Da" />')
    fails('<input type="number" ref="field" validate="max:12" value="18" />')
    passes('<input type="number" ref="field" validate="max:12" value="12" />')
  })

  it('min:value', () => {
    fails('<input type="text" ref="field" validate="min:2" value="D" />')
    passes('<input type="text" ref="field" validate="min:2" value="Da" />')
    fails('<input type="number" ref="field" validate="min:18" value="17" />')
    passes('<input type="number" ref="field" validate="min:18" value="18" />')
  })

  it('not_in:foo,bar,...', () => {
    fails('<input type="text" ref="field" validate="not_in:skaterdav85,dtang,dtang85" value="skaterdav85" />')
    passes('<input type="text" ref="field" validate="not_in:user1,user2,user3" value="skatedav85" />')
  })

  it('numeric', () => {
    fails('<input type="text" ref="field" validate="numeric" value="18something" />')
    passes('<input type="text" ref="field" validate="numeric" value="44" />')
  })

  it('required', () => {
    fails('<input type="text" ref="field" validate="required" value="" />')
    passes('<input type="text" ref="field" validate="required" value="David" />')
  })

  it('required_if:anotherfield,value', () => {
    fails(`
    <input type="text" ref="desert" value="icecream" />
    <input type="text" ref="flavour" validate="required_if:desert,icecream" value="" />
    `)
    passes(`
    <input type="text" ref="desert" value="icecream" />
    <input type="text" ref="flavour" validate="required_if:desert,icecream" value="chocolate" />
    `)
  })

  it('required_unless:anotherfield,value', () => {
    fails(`
    <input type="text" ref="desert" value="icecream" />
    <input type="text" ref="flavour" validate="required_unless:desert,cake" value="" />
    `)
    passes(`
    <input type="text" ref="desert" value="icecream" />
    <input type="text" ref="flavour" validate="required_unless:desert,cake" value="chocolate" />
    `)
  })

  it('required_with:anotherfield,value', () => {
    fails(`
    <input type="text" ref="desert" value="icecream" />
    <input type="text" ref="flavour" validate="required_with:desert" value="" />
    `)
    passes(`
    <input type="text" ref="desert" value="icecream" />
    <input type="text" ref="flavour" validate="required_with:desert" value="chocolate" />
    `)
  })

  it('required_with_all:anotherfield,value', () => {
    fails(`
    <input type="text" ref="first" value="icecream" />
    <input type="text" ref="second" value="icecream" />
    <input type="text" ref="flavour" validate="required_with_all:first,second" value="" />
    `)
    passes(`
    <input type="text" ref="first" value="icecream" />
    <input type="text" ref="second" value="icecream" />
    <input type="text" ref="flavour" validate="required_with_all:first,second" value="chocolate" />
    `)
    passes(`
    <input type="text" ref="first" value="icecream" />
    <input type="text" ref="flavour" validate="required_with_all:first,second" value="chocolate" />
    `)
  })

  it('required_without:anotherfield,value', () => {
    fails(`
    <input type="text" ref="first" value="icecream" />
    <input type="text" ref="flavour" validate="required_without:second" value="" />
    `)
    passes(`
    <input type="text" ref="first" value="icecream" />
    <input type="text" ref="second" value="icecream" />
    <input type="text" ref="flavour" validate="required_without:second" value="" />
    `)
  })

  it('required_without_all:anotherfield,value', () => {
    fails(`
    <input type="text" ref="flavour" validate="required_without_all:first,second" value="" />
    `)
    passes(`
    <input type="text" ref="flavour" validate="required_without_all:first,second" value="chocolate" />
    `)
    passes(`
    <input type="text" ref="first" value="icecream" />
    <input type="text" ref="flavour" validate="required_without_all:first,second" value="" />
    `)
  })

  it('same:attribute', () => {
    fails(`
    <input type="text" ref="pw" value="abc123" />
    <input type="text" ref="pw2" validate="same:pw" value="abc1234" />
    `)
    passes(`
    <input type="text" ref="pw" value="abc123" />
    <input type="text" ref="pw2" validate="same:pw" value="abc123" />
    `)
  })

  it('size:value', () => {
    fails('<input type="text" ref="field" validate="size:2" value="C" />')
    passes('<input type="text" ref="field" validate="size:2" value="CA" />')
  })

  // it('string', () => {
  //   fails('<input type="text" ref="field" validate="string" value="5" />')
  //   passes('<input type="text" ref="field" validate="string" value="{ David }" />')
  // })

  it('url', () => {
    fails('<input type="text" ref="field" validate="url" value="http://" />')
    passes('<input type="text" ref="field" validate="url" value="https://google.com" />')
  })

  it('regex', () => {
    fails('<input type="text" ref="field" validate="regex:/^(?!0.00)\\d\\{1,3\\}(,\\d\\{3\\})*(.\\d\\d)?$/" value="200.0" />')
    passes('<input type="text" ref="field" validate="regex:/^(?!0.00)\\d\\{1,3\\}(,\\d\\{3\\})*(.\\d\\d)?$/" value="12,500.00" />')
    fails('<input type="text" ref="field" pattern="/^(?!0.00)\\d\\{1,3\\}(,\\d\\{3\\})*(.\\d\\d)?$/" value="200.0" />')
    passes('<input type="text" ref="field" pattern="/^(?!0.00)\\d\\{1,3\\}(,\\d\\{3\\})*(.\\d\\d)?$/" value="12,500.00" />')
  })
})
