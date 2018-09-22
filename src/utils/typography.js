import Typography from 'typography'
import theme from 'typography-theme-bootstrap'
theme.baseFontSize = '10px'

const typography = new Typography(theme)
const { rhythm, scale } = typography
export { rhythm, scale, typography as default }
