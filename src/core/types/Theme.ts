export interface Theme {
    components: Components,
    pallet: Pallet
}

export interface Components {
    [k: string]: ComponentOptions
}

export interface Pallet {
    [k: string]: any
}

export interface ComponentOptions {
    defaultProps?: object
}
