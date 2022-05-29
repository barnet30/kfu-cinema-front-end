import { Genre } from "../genre";
import { DirectorDetail } from '../directorDetail';
import { ActorDetail } from '../actor/actorDetail';

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
        public estimationAmount: number,
        public genres: Genre[],
        public director: DirectorDetail,
        public actors: ActorDetail[]) {}
}