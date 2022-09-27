import styled  from './styled'
export *       from './styled'
import {App} from 'vue'
import {createTheme, useTheme} from  './utils/utils'
export * from './types/Theme'


export {
    styled,
    createTheme,
    useTheme,
}

export default {
    install(app:App) {
        app.config.globalProperties.createTheme = createTheme
        app.config.globalProperties.useTheme = useTheme
        app.config.globalProperties.styled = styled
    }
}
