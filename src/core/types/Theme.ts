export interface Theme {
    components?: {
        [k: string]: ComponentOptions
    },
    pallet?: {
        [k: string]: string
    }
}

export interface ComponentOptions {
    defaultProps?: object
}
