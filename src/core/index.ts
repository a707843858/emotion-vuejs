import styled                  from './styled'
import {createTheme, useTheme} from './utils/utils'
import {App}                   from 'vue'

export type {Theme, ComponentOptions} from './types/Theme'
export {
    styled,
    createTheme,
    useTheme
}

export default {
    install(app:App) {
        app.config.globalProperties.createTheme = createTheme
        app.config.globalProperties.useTheme = useTheme
        app.config.globalProperties.styled = styled
    }
}
