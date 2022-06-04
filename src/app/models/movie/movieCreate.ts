import { Category } from '../../common/category';
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
        public category: Category,
        public actors: number[],
        public genres: number[]
    ) {}
}