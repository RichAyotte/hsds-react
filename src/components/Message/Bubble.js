import React from 'react'
import Heading from '../Heading'
import LoadingDots from '../LoadingDots'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { isWord } from '../../utilities/strings'
import { isNativeSpanType } from '../../utilities/types'
import {bubbleTypes, providerContextTypes} from './propTypes'

export const propTypes = bubbleTypes
const contextTypes = providerContextTypes

const Bubble = (props, context) => {
  const {
    body,
    children,
    className,
    from,
    isNote,
    ltr,
    primary,
    rtl,
    size,
    timestamp,
    title,
    to,
    typing,
    type,
    ...rest
  } = props
  const {theme} = context

  const componentClassName = classNames(
    'c-MessageBubble',
    from && 'is-from',
    isNote && 'is-note',
    primary && 'is-primary',
    size && `is-${size}`,
    (ltr && !rtl) && 'is-ltr',
    (!ltr && rtl) && 'is-rtl',
    theme && `is-theme-${theme}`,
    to && 'is-to',
    typing && 'is-typing',
    className
  )

  const childrenMarkup = React.Children.map(children, child => {
    return isWord(child) || isNativeSpanType(child) ? (
      <span className='c-MessageBubble__body'>
        <Text wordWrap>
          {child}
        </Text>
      </span>
    ) : child
  })

  const bodyMarkup = body ? (
    <span
      className='c-MessageBubble__body'
      dangerouslySetInnerHTML={{__html: body}}
    />
  ) : childrenMarkup

  const titleMarkup = title ? (
    <Heading className='c-MessageBubble__title' size='small'>
      {title}
    </Heading>
  ) : null

  const contentMarkup = typing ? (
    <div className='c-MessageBubble__typing'>
      <LoadingDots />
    </div>
  ) : bodyMarkup

  return (
    <div className={componentClassName} {...rest}>
      {titleMarkup}
      {contentMarkup}
    </div>
  )
}

Bubble.propTypes = propTypes
Bubble.contextTypes = contextTypes

export default Bubble
