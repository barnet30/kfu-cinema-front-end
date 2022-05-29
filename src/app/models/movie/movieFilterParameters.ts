export class MovieFilterParameters{
    constructor(
        public limit: number,
        public offset: number,
        public yearFrom?: number,
        public yearTo?: number,
        public name?: string,
        public countryId?: number,
        public genres?: number[]
    ){}
}