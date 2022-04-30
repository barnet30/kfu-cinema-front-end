export class MovieFilterParameters{
    constructor(
        public yearFrom: number,
        public yearTo: number,
        public name: string,
        public countryId: number,
        public genres: number[]
    ){}
}