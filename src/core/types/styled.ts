import {ExtraStyledArgs, Theme}                                                        from '@/core'
import {CSSProperties, ComponentInternalInstance, SetupContext, RenderFunction, VNode} from 'vue'

export interface StyledComponent<Props, RawBindings> extends JSX.Element,StyledComponentExtraProperty<Props, RawBindings> {
    [k: string]: any
}


export type StyledOptions = {
    /* 标签名 */
    label?: string,
    /* 类名 */
    target?: string
}

export   type StyledArgs = ExtraStyledArgs | CSSProperties | ((theme: Theme) => CSSProperties)


export interface TsxComponentInternalInstance<Props, RawBindings = object> extends ComponentInternalInstance {
    emotionData?: StyledComponentExtraProperty<Props, RawBindings>
    parent : TsxComponentInternalInstance<Props, RawBindings> | null
}


export interface StyledComponentExtraProperty<Props, RawBindings = object> {
    /* 名称 */
    displayName?: string;
    /* 默认 Prop  */
    defaultProps?: Props
    setup?: (props: Readonly<Props>, ctx: SetupContext) => () => RawBindings | RenderFunction | VNode;
    render?: () => VNode
    /* 基础组件 */
    __emotion_base?: string | StyledComponent<Props, RawBindings>
    /* 基础样式 */
    __emotion_styles?: any[]
    /* 基础组件整体 */
    __emotion_real?: JSX.Element
    /* 名称 */
    __name?: string
    /* 名称 */
    name?: string;
    /* 文件路径 */
    __file?: string

    toString: () => string
}

export type SetupRender<Props,RawBindings = object> =  (props:Props,ctx:SetupContext) => RawBindings | RenderFunction
