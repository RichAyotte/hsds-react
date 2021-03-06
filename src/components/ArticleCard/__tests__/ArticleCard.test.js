import React from 'react'
import { mount } from 'enzyme'
import { ArticleCard } from '../ArticleCard'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<ArticleCard />)
    const o = wrapper.find('div.c-Card')

    expect(o.hasClass('c-Card')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<ArticleCard className="not-metro-man" />)

    expect(wrapper.prop('className')).toContain('not-metro-man')
  })
})

describe('Content', () => {
  test('Render markup from prop', () => {
    const html = <div className="customMarkup">Custom Markup</div>
    const wrapper = mount(<ArticleCard content={html} />)
    const innerContent = wrapper
      .find('.c-ArticleCard__contentMarkup')
      .last()
      .html()
    expect(innerContent).toContain(
      '<div class="customMarkup">Custom Markup</div>'
    )
  })

  test('Render text from prop', () => {
    const content =
      'Some people choose to see the ugliness in this world. The disarray. I choose to see the beauty.'
    const wrapper = mount(<ArticleCard content={content} />)

    const innerContent = wrapper
      .find('.c-ArticleCard__contentText')
      .last()
      .text()
    expect(innerContent).toBe(content)
  })

  test('Render truncate text from prop', () => {
    const limit = 25
    const content =
      'Some people choose to see the ugliness in this world. The disarray. I choose to see the beauty.'
    const wrapper = mount(
      <ArticleCard content={content} contentLimit={limit} />
    )

    const innerContent = wrapper.find('div.c-ArticleCard__content').text()
    expect(innerContent.length).toBe(limit + 1) // +1 is to include the ellipsis
  })

  test('Render custom font-size', () => {
    const fontSize = 16
    const content =
      'Some people choose to see the ugliness in this world. The disarray. I choose to see the beauty.'
    const wrapper = mount(
      <ArticleCard content={content} contentSize={fontSize} />
    )

    const innerContent = wrapper.find(
      `div.c-ArticleCard__content .is-${fontSize}`
    )
    expect(innerContent.length).toBe(1)
  })
})

describe('title', () => {
  test('Render text from prop', () => {
    const title = 'Teddy Flood'
    const wrapper = mount(<ArticleCard title={title} />)

    const innerTitle = wrapper.find('div.c-ArticleCard__title').text()
    expect(innerTitle).toBe(title)
  })

  test('Render truncate text from prop', () => {
    const limit = 10
    const title = 'Teddy Flood'
    const wrapper = mount(<ArticleCard title={title} titleLimit={limit} />)

    const innerTitle = wrapper.find('div.c-ArticleCard__title').text()
    expect(innerTitle.length).toBe(limit + 1) // +1 is to include the ellipsis
  })

  test('Render custom font-size', () => {
    const fontSize = 16
    const title = 'Teddy Flood'
    const wrapper = mount(<ArticleCard title={title} titleSize={fontSize} />)

    const innerTitle = wrapper.find(`div.c-ArticleCard__title .is-${fontSize}`)
    expect(innerTitle.length).toBe(1)
  })
})

describe('metaHeader', () => {
  test('Render text from prop', () => {
    const metaHeader = 'Loud Noises'
    const wrapper = mount(<ArticleCard metaHeader={metaHeader} />)

    const innerMetaHeader = wrapper
      .find('header.c-ArticleCard__metaHeader')
      .text()
    expect(innerMetaHeader).toBe(metaHeader)
  })

  test('Render child from prop', () => {
    const content = 'Loud Noises'
    const metaHeader = <div>{content}</div>
    const wrapper = mount(<ArticleCard metaHeader={metaHeader} />)

    const innerMetaHeader = wrapper
      .find('header.c-ArticleCard__metaHeader')
      .text()
    expect(innerMetaHeader).toContain(content)
  })
})

describe('footer', () => {
  test('Render text from prop', () => {
    const footer = 'Loud Noises'
    const wrapper = mount(<ArticleCard footer={footer} />)

    const innerFooter = wrapper.find('footer.c-ArticleCard__footer').text()

    expect(innerFooter).toBe(footer)
  })

  test('Render child from prop', () => {
    const content = 'Loud Noises'
    const footer = <div>{content}</div>
    const wrapper = mount(<ArticleCard footer={footer} />)

    const innerFooter = wrapper.find('footer.c-ArticleCard__footer').text()

    expect(innerFooter).toContain(content)
  })
})

describe('Styles', () => {
  test('Adds isHovered styles, if specified', () => {
    const wrapper = mount(<ArticleCard isHovered />)
    const o = wrapper.find('div.c-ArticleCard')

    expect(o.hasClass('is-hovered')).toBe(true)
  })
})
