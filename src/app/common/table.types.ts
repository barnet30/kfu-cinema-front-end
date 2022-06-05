export enum SortingEnum {
    ASC = 0, DESC = 1
}

export type Page<T> = {
    total: number;
    items: T[];
}

export type BatchSize = 15 | 30 | 45;