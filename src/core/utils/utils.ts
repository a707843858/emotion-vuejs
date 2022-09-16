import {Theme}           from '../types/Theme'
import {provide, inject} from 'vue'

export const uniqueKey: string = new Date().getTime() + '_emotion_key'

const themeCache = []

/* 创建主题 */
export const createTheme = (theme: Theme): Theme => {
    provide<Theme>(`${uniqueKey}_theme`, theme)
    return theme
}

/* 使用主题 */
export const useTheme = (): Theme => {
    return inject<Theme>(`${uniqueKey}_theme`, {pallet: {}, components: {}})
}
