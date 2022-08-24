import { SetupContext, VNode, RenderFunction } from 'vue';
import { CSSProperties } from 'vue';
import { Theme } from './types/Theme';
declare const createStyled: <Props extends object = any, RawBindings = object>(tag: string | StyledComponent<Props, RawBindings>, options?: StyledOptions) => (...args: (CSSProperties | ((theme: Theme) => CSSProperties))[]) => StyledComponent<Props, RawBindings>;
export default createStyled;
export declare type StyledOptions = {
    label?: string;
    target?: string;
};
interface ComponentExtra<Props, RawBindings = object> {
    displayName?: string;
    defaultProps?: Props;
    setup?: (props: Readonly<Props>, ctx: SetupContext) => () => RawBindings | RenderFunction | VNode;
    render?: () => VNode;
    __emotion_base?: string | StyledComponent<Props, RawBindings>;
    __emotion_styles?: any[];
    __emotion_real?: StyledComponent<Props, RawBindings>;
    __name?: string;
    name?: string;
    __file?: string;
    toString: () => string;
    withComponent: (tag: StyledComponent<Props, RawBindings>, options?: StyledOptions) => StyledComponent<Props, RawBindings>;
}
export declare type StyledComponent<Props, RawBindings = object> = ComponentExtra<Props, RawBindings>;
