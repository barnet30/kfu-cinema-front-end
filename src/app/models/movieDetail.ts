export class MovieDetail{
    constructor(
        public id: number,
        public name: string,
        public countryId: number,
        public country: string,
        public year: number,
        public description: string,
        public movieUrl: string,
        public imageUrl: string,
        public rating: number,
        public estimationAmount: number) {}
}