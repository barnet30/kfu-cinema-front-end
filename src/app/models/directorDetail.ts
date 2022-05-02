export class DirectorDetail{
    constructor(
        public id: number,
        public name: string,
        public lastName: string,
        public imageUrl: string,
        public country: string,
        public birthDate: Date,
        public description: string
    ){}
}