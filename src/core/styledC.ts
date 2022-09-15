//import {serializeStyles}                   from '@emotion/serialize'
//import {getRegisteredStyles, insertStyles} from '@emotion/utils'
//import * as process                        from 'process'
//import {uniqueKey}                         from './utils/utils'
//import {
//    h,
//    SetupContext,
//    inject,
//    Component,
//    VNode,
//    RenderFunction, AllowedComponentProps
//}                                          from 'vue'
//import createCache                         from '@emotion/cache'
//import {CSSProperties}                     from 'vue'
//import {Theme}                             from './types/Theme'
//
//const createStyled = function <Props extends object = any, RawBindings = object>(tag: string | StyledComponent<Props, RawBindings>, options?: StyledOptions) {
//    if (process.env.NODE_ENV !== 'production') {
//        if (tag === undefined) {
//            throw new Error(
//                'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
//            )
//        }
//    }
//
//    let isReal: boolean = false
//    let baseTag: StyledComponent<Props, RawBindings> | string = tag
//    let identifierName: StyledOptions['label'] = options?.label
//    let targetClassName: StyledOptions['target'] = options?.target
//    let defaultProps = typeof tag === 'string' ? undefined : tag.defaultProps
//
//    if (typeof tag !== 'string') {
//        isReal = tag.__emotion_real === tag
//        baseTag = (isReal && tag.__emotion_base) || tag
//    }
//
//
//    return function (...args: Array<StyledArgs>): StyledComponent<Props, RawBindings> {
//
//        let styles = isReal && typeof tag !== 'string' && tag.__emotion_styles !== undefined
//            ? tag.__emotion_styles.slice(0)
//            : []
//
//        console.log(styles, 'styles')
//
//        if (identifierName !== undefined) {
//            styles.push(`label:${identifierName};`)
//        }
//
//
//        const styled: StyledComponent<Props, RawBindings> = {
//            'displayName': identifierName !== undefined ? identifierName : `Styled(${
//                typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || baseTag.__name || 'Component'
//            })`,
//            'defaultProps': defaultProps,
//            'setup': (props: any, {slots, attrs = {}}: SetupContext) => {
//                const theme = inject(`${uniqueKey}_theme`, {})
//                const emotionCache: any = inject('emotionCache', createCache({key: 'ev'}))
//                const classInterpolations: any[] = []
//                const mergedProps = {
//                    ...attrs,
//                    theme
//                }
//                const newProps = {...(defaultProps || {}), ...props}
//
//                const children = slots?.default && slots.default() || undefined
//
//                let argsLen = args.length
//                if (argsLen) {
//                    for (let i = 0; i < argsLen; i++) {
//                        const item = args[i]
//
//                        if (typeof item === 'object') {
//                            styles.push(args[i])
//                        } else if (item && typeof item === 'function') {
//                            //@ts-ignore
//                            const res = args[i](theme)
//                            styles.push(res)
//                        } else {
//                            throw  new Error('Property item must be cssProperty ! ')
//                        }
//                    }
//                }
//
//                let classNames = ''
//                if (typeof attrs.class === 'string') {
//                    classNames = getRegisteredStyles(
//                        emotionCache.registered,
//                        classInterpolations,
//                        ''
//                    )
//                }
//
//
//                const serialized = serializeStyles(
//                    styles.concat(classInterpolations),
//                    emotionCache.registered,
//                    mergedProps
//                )
//
//                insertStyles(
//                    emotionCache,
//                    serialized,
//                    typeof baseTag === 'string'
//                )
//
//                classNames += `${emotionCache.key}-${serialized.name}`
//                if (targetClassName !== undefined) {
//                    classNames += ` ${targetClassName}`
//                }
//
//
//                return () => h(baseTag as Component, {class: classNames, ...newProps}, [children])
//            },
//            '__emotion_base': baseTag,
//            '__emotion_styles': styles,
//            'withComponent': (nextTag, nextOptions) => {
//                return createStyled(
//                    nextTag,
//                    nextOptions === undefined ?
//                        options :
//                        {...(options || {}), ...nextOptions}
//                )(...styles)
//            }
//        }
//
//
//        Object.defineProperty(styled, 'toString', {
//            value() {
//                if (
//                    targetClassName === undefined &&
//                    process.env.NODE_ENV !== 'production'
//                ) {
//                    return 'NO_COMPONENT_SELECTOR'
//                }
//                return `.${targetClassName}`
//            }
//        })
//
//
//        styled.__emotion_real = styled
//
//
//        return styled
//
//    }
//}
//
//export default createStyled
//
//export type StyledOptions = {
//    /* 标签名 */
//    label?: string,
//    /* 类名 */
//    target?: string
//}
//
//interface ComponentExtra<Props, RawBindings = object> {
//    functional: boolean;
//    /* 名称 */
//    displayName?: string;
//    /* 默认 Prop  */
//    defaultProps?: Props
//    setup?: (props: Readonly<Props>, ctx: SetupContext) => () => RawBindings | RenderFunction | VNode;
//    render?: () => VNode
//    /* 基础组件 */
//    __emotion_base?: string | StyledComponent<Props, RawBindings>
//    /* 基础样式 */
//    __emotion_styles?: any[]
//    /* 基础组件整体 */
//    __emotion_real?: StyledComponent<Props, RawBindings>
//    /* 名称 */
//    __name?: string
//    /* 名称 */
//    name?: string;
//    /* 文件路径 */
//    __file?: string
//    toString: () => string
//    withComponent: (tag: StyledComponent<Props, RawBindings>, options?: StyledOptions) => StyledComponent<Props, RawBindings>
//}
//
//export interface StyledComponent<Props, RawBindings = object> {
//    /* 名称 */
//    displayName?: string;
//    /* 默认 Prop  */
//    defaultProps?: Props
//    setup?: (props: Readonly<Props>, ctx: SetupContext) => () => RawBindings | RenderFunction | VNode;
//    render?: () => JSX.Element
//    /* 基础组件 */
//    __emotion_base?: string | StyledComponent<Props, RawBindings>
//    /* 基础样式 */
//    __emotion_styles?: any[]
//    /* 基础组件整体 */
//    __emotion_real?: StyledComponent<Props, RawBindings>
//    /* 名称 */
//    __name?: string
//    /* 名称 */
//    name?: string;
//    /* 文件路径 */
//    __file?: string
//    toString: () => string
//    withComponent: (tag: StyledComponent<Props, RawBindings>, options?: StyledOptions) => StyledComponent<Props, RawBindings>
//}
//
//export   type StyledArgs = ExtraStyledArgs | CSSProperties | ((theme: Theme) => CSSProperties)
//
//export interface ExtraStyledArgs {
//    [k: string]: CSSProperties | ExtraStyledArgs
//}

export  default  {}
