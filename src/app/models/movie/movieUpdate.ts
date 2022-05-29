export class MovieUpdate{
    constructor(
        public id: number,
        public name: string,
        public countryId: number,
        public country: string,
        public year: number,
        public description: string,
        public movieUrl: string,
        public imageUrl: string,
        public directorId: number,
        public genres: number[],
        public actors: number[]) {}
}