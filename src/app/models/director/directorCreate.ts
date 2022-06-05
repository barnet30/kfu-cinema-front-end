export class DirectorCreate{
    constructor(
        public name: string,
        public lastName: string,
        public imageUrl: string,
        public countryId: number,
        public country: string,
        public birthDate: string,
        public description: string
    ){}
}