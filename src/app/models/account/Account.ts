import { Role } from "src/app/common/role";

export class Account{
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public createdAt: Date,
        public roles: Role[]
    ) {}
}