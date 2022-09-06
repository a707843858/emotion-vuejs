import {StyledComponent, StyledOptions, StyledComponentExtraProperty} from '@/core/types/styled'
import process                                                        from 'process'

export default function <Props extends object = any, RawBindings = object>(tag: string | StyledComponentExtraProperty<Props,RawBindings>, options?: StyledOptions) {
    if (process.env.NODE_ENV !== 'production') {
        if (tag === undefined) {
            throw new Error(
                'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
            )
        }
    }

    const response = {
        isReal: false,
        baseTag: tag,
        identifierName: options?.label,
        targetClassName: options?.target,
        defaultProps: typeof tag === 'string' ? undefined : tag.defaultProps,
        styles:<Array<any>>[],
    }

    if (typeof tag !== 'string') {
        response.isReal = tag.__emotion_real === tag
        response.baseTag = (response.isReal && tag.__emotion_base) || tag
        response.styles = typeof tag !== 'string' && response.isReal ? (tag.__emotion_styles?.slice(0) ?? []) : []
    }

    return response
}
