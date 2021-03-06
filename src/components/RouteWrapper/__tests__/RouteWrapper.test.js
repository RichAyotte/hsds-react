import React, { Component } from 'react'
import { shallow } from 'enzyme'
import RouteWrapper from '..'

// Since we now wrap Link in a HOC, we have to use `.first.shallow()` to test.
// See https://github.com/airbnb/enzyme/issues/539#issuecomment-239497107
const wrap = (...args) =>
  shallow(...args)
    .first()
    .shallow()

describe('Route fetching', () => {
  let options
  let push
  let history
  let preventDefault
  let clickEvent

  beforeEach(() => {
    push = jest.fn()
    history = { push }
    options = {
      context: {
        router: { history },
      },
    }
    preventDefault = jest.fn()
    clickEvent = { preventDefault }
  })

  class SomePig extends Component {
    render() {
      return <div {...this.props}>Some pig!</div>
    }
  }
  const RouteWrappedPig = RouteWrapper(SomePig)

  test('Can fetch data and trigger a route asynchronously', done => {
    const fetch = () => {
      return Promise.resolve()
    }
    const to = 'some/route'
    const wrapper = wrap(<RouteWrappedPig fetch={fetch} to={to} />, options)
    expect(wrapper.getElement().type).toBe('div')
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(to)
      done()
    })
  })

  test('Specifying a `to` but no `fetch()` routes correctly', done => {
    const to = 'some/other/route'
    const wrapper = wrap(<RouteWrappedPig to={to} />, options)
    expect(wrapper.getElement().type).toBe('div')
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(to)
      done()
    })
  })

  test('Rendering with a `to` but _not_ inside a `<Router>` context should log an error', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const to = 'some/route'
    // No Router in the context!
    wrap(<RouteWrappedPig to={to} />)
    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockReset()
    errorSpy.mockRestore()
  })
})

describe('displayName', () => {
  test('Uses a ComposedComponent.name', () => {
    const Derek = () => <div />
    const WrappedComponent = RouteWrapper(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Uses a ComposedComponent.displayName', () => {
    const Composed = () => <div />
    Composed.displayName = 'Derek'
    const WrappedComponent = RouteWrapper(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component', () => {
    class Derek extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component.displayName', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    Composed.displayName = 'Derek'
    const WrappedComponent = RouteWrapper(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })
})
