import { SortingEnum } from '../../common/table.types';
export class MovieFilterParameters{
    constructor(
        public limit: number,
        public offset: number,
        public sortColumn?: string,
        public sortOrder?: SortingEnum,
        public yearFrom?: number,
        public yearTo?: number,
        public name?: string,
        public countryId?: number,
        public genres?: number[]
    ){}
}