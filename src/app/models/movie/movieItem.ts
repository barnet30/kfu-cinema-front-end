import { Category } from 'src/app/common/category';
import { Genre } from '../genre/genre';
export class MovieItem{
    constructor( 
        public id: number,
        public name: string,
        public country: string,
        public year: number,
        public description: string,
        public imageUrl: string,
        public createdAt: Date,
        public category: Category,
        public rating: number,
        public genres: Genre[]) {}

}