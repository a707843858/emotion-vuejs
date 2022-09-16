import {serializeStyles}                   from '@emotion/serialize'
import {getRegisteredStyles, insertStyles} from '@emotion/utils'
import process                             from 'process'
import {uniqueKey, useTheme}               from './utils/utils'
import {
    h,
    DefineComponent,
    ComponentOptionsMixin,
    ComputedOptions,
    EmitsOptions,
    MethodOptions,
    SetupContext,
    inject,
    Component,
    defineComponent, getCurrentInstance,
    getCurrentScope,
    ref, onBeforeMount, provide
}                                          from 'vue'
import createCache                         from '@emotion/cache'
import {CSSProperties}                     from 'vue'
import {Theme}                             from './types/Theme'

const createStyled = function <Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = EmitsOptions, EE extends string = string>(tag: string | DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE>, options?: StyledOptions) {

    if (process.env.NODE_ENV === 'production' && !tag) {
        throw new Error(
            'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
        )
    }


    let isReal: boolean = false
    let baseTag: DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE> | string = tag
    let identifierName: StyledOptions['label'] = options?.label
    let targetClassName: StyledOptions['target'] = options?.target
    let defaultProps = typeof tag === 'string' ? undefined : tag.defaultProps

    if (typeof tag !== 'string') {
        isReal = tag.__emotion_real === tag
        baseTag = (isReal && tag.__emotion_base) || tag
    }

    return (...args: Array<StyledArgs>) => {


        let styles = isReal && typeof tag !== 'string' && tag.__emotion_styles !== undefined
            ? tag.__emotion_styles.slice(0)
            : []

        if (identifierName !== undefined) {
            styles.push(`label:${identifierName};`)
        }


        const theme = useTheme()
        let argsLen = args.length
        if (argsLen) {
            for (let i = 0; i < argsLen; i++) {
                const item = args[i]

                if (typeof item === 'object') {
                    styles.push(args[i])
                } else if (item && typeof item === 'function') {
                    //@ts-ignore
                    const res = args[i](theme)
                    styles.push(res)
                } else {
                    throw  new Error('Property item must be cssProperty ! ')
                }
            }
        }


        let component = defineComponent({
            name: '',
            'displayName': identifierName !== undefined ? identifierName : `Styled(${
                typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component'
            })`,
            'defaultProps': defaultProps,
            '__emotion_base': baseTag,
            '__emotion_styles': styles,
            'withComponent': (nextTag: any, nextOptions: any) => {
                return createStyled(
                    nextTag,
                    nextOptions === undefined ?
                        options :
                        {...(options || {}), ...nextOptions}
                )(...styles)
            },
            setup(props, {slots, attrs = {}, expose}: SetupContext) {

                const emotionCache: any = inject('emotionCache', createCache({key: 'ev'}))
                const classInterpolations: any[] = []
                const mergedProps = {
                    ...attrs,
                    theme
                }
                const newProps = {...(defaultProps || {}), ...props}

                let classNames = ''
                if (typeof attrs.class === 'string') {
                    classNames = getRegisteredStyles(
                        emotionCache.registered,
                        classInterpolations,
                        ''
                    )
                }


                const serialized = serializeStyles(
                    styles.concat(classInterpolations),
                    emotionCache.registered,
                    mergedProps
                )

                insertStyles(
                    emotionCache,
                    serialized,
                    typeof baseTag === 'string'
                )

                classNames += `${emotionCache.key}-${serialized.name}`
                if (targetClassName !== undefined) {
                    classNames += ` ${targetClassName}`
                }


                return () => (<baseTag class={classNames} {...newProps} v-slots={slots}/>)
            }
        })

        Object.defineProperty(component, 'toString', {
            value() {
                if (
                    targetClassName === undefined &&
                    process.env.NODE_ENV !== 'production'
                ) {
                    return 'NO_COMPONENT_SELECTOR'
                }
                return `.${targetClassName}`
            }
        })

        component.__emotion_real = component

//        console.log('component', component)


        return component
    }
}

export default createStyled

export   type StyledArgs = ExtraStyledArgs | CSSProperties | ((theme: Theme) => CSSProperties)

export interface ExtraStyledArgs {
    [k: string]: CSSProperties | ExtraStyledArgs
}

export type StyledOptions = {
    /* 标签名 */
    label?: string,
    /* 类名 */
    target?: string
}

