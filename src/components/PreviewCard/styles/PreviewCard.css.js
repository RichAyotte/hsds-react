import { getColor } from '../../../styles/utilities/color'
import { noteBoxShadowWithHover } from '../../../styles/mixins/noteStyles.css'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-PreviewCard')

const css = `
  ${baseStyles}
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }

  ${bem.element('title')} {
    margin-bottom: 4px;
  }

  // Modifiers
  &.is-link {
    ${bem.element('title')} {
      color: ${getColor('link.base')};
    }
  }

  &.is-note {
    ${noteBoxShadowWithHover()}
    border: none;
  }
`

export default css
