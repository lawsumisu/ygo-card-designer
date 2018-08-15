export interface Field {
    id: string
}

export interface Model<T extends Field> {
    allIds: string[],
    byId: {
        [id: string]: T
    }
}