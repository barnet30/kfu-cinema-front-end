export class ActorDetail{
    constructor(
        public id: number,
        public name: string,
        public lastName: string,
        public imageUrl: string,
        public countryId: number,
        public country: string,
        public birthDate: Date,
        public description: string,
        public createdAt: Date
    ){}
}