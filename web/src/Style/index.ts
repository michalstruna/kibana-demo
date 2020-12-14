import Styled from 'styled-components'

import Dimension from './Constants/Dimension'

export { default as Color } from './Constants/Color'
export { default as Dimension } from './Constants/Dimension'
export { default as Duration } from './Constants/Duration'
export { default as ZIndex } from './Constants/ZIndex'

export * from './Utils/Keyframes'
export * from './Utils/Mixins'

export const View = Styled.div`
    min-height: calc(100vh - ${Dimension.NAV_HEIGHT});
    overflow: hidden;
`