import * as React from 'react'
import { mount } from 'enzyme'
import createStore from '../Dropdown.store'
import { Provider } from '@helpscout/wedux'
import Keys from '../../../../constants/Keys'
import ConnectedTrigger, { Trigger } from '../Dropdown.Trigger'
import { hasClass, getAttribute } from '../../../../tests/helpers/enzyme'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Trigger />)

    expect(hasClass(wrapper, 'c-DropdownV2Trigger')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Trigger className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })
})

describe('children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Trigger>
        <div className="ron">Ron</div>
      </Trigger>
    )

    expect(wrapper.find('div.ron').length).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('aria-expanded matches open state', () => {
    const wrapper = mount(<Trigger isOpen={false} />)

    expect(getAttribute(wrapper, 'aria-expanded')).toBe('false')

    wrapper.setProps({ isOpen: true })

    expect(getAttribute(wrapper, 'aria-expanded')).toBe('true')
  })

  test('Can set an ID', () => {
    const wrapper = mount(<Trigger id="dropdown-trigger-ron" />)

    expect(getAttribute(wrapper, 'id')).toBe('dropdown-trigger-ron')
  })
})

describe('innerRef', () => {
  test('Can set an innerRef to a DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Trigger innerRef={spy} />)
    const el = wrapper.getDOMNode()

    expect(spy).toHaveBeenCalledWith(el)
  })
})

describe('Events', () => {
  test('onBlur can be fired', () => {
    const spy = jest.fn()
    const wrapper = mount(<Trigger onBlur={spy} />)

    wrapper.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('onClick can be fired', () => {
    const spy = jest.fn()
    const wrapper = mount(<Trigger onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus can be fired', () => {
    const spy = jest.fn()
    const wrapper = mount(<Trigger onFocus={spy} />)

    wrapper.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })

  test('onKeydown can be fired', () => {
    const spy = jest.fn()
    const wrapper = mount(<Trigger onKeyDown={spy} />)

    wrapper.simulate('keydown')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Actions', () => {
  test('Toggles open on click', () => {
    const spy = jest.fn()
    const wrapper = mount(<Trigger toggleOpen={spy} isOpen={false} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('Opens dropdown when down arrow key is pressed', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Trigger toggleOpen={spy} openDropdown={spy} isOpen={false} />
    )

    wrapper.simulate('keydown', { keyCode: Keys.DOWN_ARROW })

    expect(spy).toHaveBeenCalled()
  })

  test('Opens dropdown when Enter key is pressed', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Trigger toggleOpen={spy} openDropdown={spy} isOpen={false} />
    )

    wrapper.simulate('keydown', { keyCode: Keys.ENTER })

    expect(spy).toHaveBeenCalled()
  })

  test('Closes dropdown when Tab+Shift key is pressed', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Trigger toggleOpen={spy} closeDropdown={spy} isOpen={true} />
    )

    wrapper.simulate('keydown', { keyCode: Keys.TAB, shiftKey: true })

    expect(spy).toHaveBeenCalled()
  })

  test('Does not closes dropdown when Tab key is pressed (without shift)', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Trigger toggleOpen={spy} closeDropdown={spy} isOpen={true} />
    )

    wrapper.simulate('keydown', { keyCode: Keys.TAB, shiftKey: false })

    expect(spy).not.toHaveBeenCalled()
  })

  test('Open dropdown fires, only when dropdown is closed', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Trigger toggleOpen={spy} openDropdown={spy} isOpen={true} />
    )

    wrapper.simulate('keydown', { keyCode: Keys.DOWN_ARROW })

    expect(spy).not.toHaveBeenCalled()
  })

  test('Close dropdown fires, only when dropdown is closed', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Trigger toggleOpen={spy} closeDropdown={spy} isOpen={false} />
    )

    wrapper.simulate('keydown', { keyCode: Keys.TAB, shiftKey: true })

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('ConnectedTrigger', () => {
  test('Can render', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <ConnectedTrigger />
      </Provider>
    )
    const el = wrapper.find('.c-DropdownV2Trigger')

    expect(wrapper).toBeTruthy()
    expect(el.length).toBeTruthy()
  })
})
