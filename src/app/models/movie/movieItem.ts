import { Genre } from '../genre';
export class MovieItem{
    constructor( 
        public id: number,
        public name: string,
        public country: string,
        public year: number,
        public description: string,
        public imageUrl: string,
        public createdAt: Date,
        public genres: Genre[]) {}

}