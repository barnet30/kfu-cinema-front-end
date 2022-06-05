import { Genre } from "../genre/genre";
import { DirectorDetail } from '../director/directorDetail';
import { ActorDetail } from '../actor/actorDetail';
import { Category } from "src/app/common/category";

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
        public category: Category,
        public director: DirectorDetail,
        public actors: ActorDetail[]) {}
}