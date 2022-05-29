export class MovieCreate{
    constructor(
        public name: string,
        public countryId: number,
        public country: string,
        public year: number,
        public description: string,
        public movieUrl: string,
        public imageUrl: string,
        public directorId: number,
        public actors: number[],
        public genres: number[]
    ) {}
}