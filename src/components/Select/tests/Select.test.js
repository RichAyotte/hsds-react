import React from 'react'
import { mount, shallow } from 'enzyme'
import Select from '..'

describe('Placeholder', () => {
  test('Renders a placeholder if defined', () => {
    const placeholder = 'Choose your co-anchor…'
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} placeholder={placeholder} />)
    const select = wrapper.find('select')
    const selectOptions = select.children()

    expect(selectOptions.first().prop('label')).toBe(placeholder)
  })

  test('Does not render a placeholder if a value is passed', () => {
    const placeholder = 'Choose your co-anchor…'
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} placeholder={placeholder} value='Brick Tamland' />)
    const select = wrapper.find('select')
    const selectOptions = select.children()

    expect(selectOptions.first().prop('label')).not.toBe(placeholder)
  })
})

describe('Option', () => {
  test('Renders with a single string', () => {
    const options = 'Brick Tamland'
    const wrapper = mount(<Select options={options} />)
    const selectOptions = wrapper.find('select').children()

    expect(selectOptions.first().prop('value')).toBe(options)
    expect(selectOptions.first().text()).toBe(options)
  })

  test('Renders with an array of strings', () => {
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} />)
    const selectOptions = wrapper.find('select').children()

    expect(selectOptions.first().text()).toBe('Champ Kind')
    expect(selectOptions.length).toBe(options.length)
  })

  test('Renders with a correct object schema', () => {
    const options = {
      label: 'Champ Kind',
      value: 'champ',
      disabled: true
    }
    const wrapper = mount(<Select options={options} />)
    const selectOptions = wrapper.find('select').children()
    const o = selectOptions.first()

    expect(o.prop('value')).toBe(options.value)
    expect(o.text()).toBe(options.label)
    expect(o.prop('disabled')).toBeTruthy()
  })
})

describe('Group', () => {
  test('Renders optgroup if the options.value is an array', () => {
    const options = {
      label: 'Group',
      value: ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    }
    const wrapper = mount(<Select options={options} />)
    const group = wrapper.find('optgroup')
    const option = group.children().first()

    expect(group.exists()).toBeTruthy()
    expect(group.prop('label')).toBe(options.label)
    expect(group.children().length).toBe(options.value.length)
    expect(option.exists()).toBeTruthy()
    expect(option.text()).toBe(options.value[0])
  })

  test('Can render an optgroup of one', () => {
    const options = {
      label: 'Group',
      value: ['Brick Tamland']
    }
    const wrapper = mount(<Select options={options} />)
    const group = wrapper.find('optgroup')
    const option = group.children().first()

    expect(group.exists()).toBeTruthy()
    expect(group.children().length).toBe(options.value.length)
    expect(option.exists()).toBeTruthy()
    expect(option.text()).toBe(options.value[0])
  })

  test('Can render multiple optgroups', () => {
    const options = [
      {
        label: 'Channel 4',
        value: ['Ron Burgandy', 'Champ Kind', 'Brian Fantana', 'Brick Tamland']
      },
      {
        label: 'Evening',
        value: ['Wes Mantooth']
      },
      {
        label: 'Channel 2',
        value: ['Frank Vitchard']
      },
      {
        label: 'Spanish Language News',
        value: ['Arturo Mendez']
      }
    ]
    const wrapper = mount(<Select options={options} />)
    const groups = wrapper.find('optgroup')

    expect(groups.exists()).toBeTruthy()
    expect(groups.length).toBe(options.length)
    expect(groups.first().children().length).toBe(options[0].value.length)
  })
})

describe('Value', () => {
  test('Selects the value if defined', () => {
    const value = 'Brian Fantana'
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} value={value} />)
    const select = wrapper.find('select')

    expect(select.prop('value')).toBe(value)
  })
})

describe('Events', () => {
  test('onChange callback passes selected value', () => {
    let result = ''
    const onChange = (value) => { result = value }
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} onChange={onChange} />)

    wrapper.find('select').simulate('change')
    expect(result).toBe(options[0])
  })
})

describe('Prefix', () => {
  test('Adds prefix if defined', () => {
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const prefix = 'Pick one'
    const wrapper = mount(
      <Select options={options} prefix={prefix} />
    )

    expect(wrapper.find('.c-Select__prefix').text()).toBe(prefix)
  })
})

describe('States', () => {
  test('Disables select if disabled prop is true', () => {
    const wrapper = shallow(<Select disabled />)
    const o = wrapper.find('select')

    expect(o.prop('disabled')).toBeTruthy()
  })

  describe('Error', () => {
    test('Applies error styles if error prop is true', () => {
      const wrapper = shallow(<Select error />)
      const o = wrapper.find('.c-Select')

      expect(o.prop('className')).toContain('is-error')
    })

    test('Adds error helper text if error prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = shallow(<Select error={message} />)
      const o = wrapper.find('.c-InputHelperLabel')

      expect(o.text()).toContain(message)
    })
  })

  describe('Success', () => {
    test('Applies success styles if success prop is true', () => {
      const wrapper = shallow(<Select success />)
      const o = wrapper.find('.c-Select')

      expect(o.prop('className')).toContain('is-success')
    })

    test('Adds success helper text if success prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = shallow(<Select success={message} />)
      const o = wrapper.find('.c-InputHelperLabel')

      expect(o.text()).toContain(message)
    })
  })

  describe('Warning', () => {
    test('Applies warning styles if warning prop is true', () => {
      const wrapper = shallow(<Select warning />)
      const o = wrapper.find('.c-Select')

      expect(o.prop('className')).toContain('is-warning')
    })

    test('Adds warning helper text if warning prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = shallow(<Select warning={message} />)
      const o = wrapper.find('.c-InputHelperLabel')

      expect(o.text()).toContain(message)
    })
  })
})

describe('Styles', () => {
  test('Adds seamless styles if defined', () => {
    const wrapper = mount(<Select seamless />)
    const o = wrapper.find('.c-Select')

    expect(o.prop('className')).toContain('is-seamless')
  })

  test('Adds sizing styles if defined', () => {
    const wrapper = mount(<Select size='sm' />)
    const o = wrapper.find('.c-InputField')

    expect(o.prop('className')).toContain('is-sm')
  })
})