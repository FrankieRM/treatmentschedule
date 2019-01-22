import { IPerson } from 'app/shared/model//person.model';
import { IUser } from 'app/core/user/user.model';
import { IAddress } from 'app/shared/model//address.model';
import { IParameter } from 'app/shared/model//parameter.model';

export interface IEmployee {
    id?: number;
    position?: string;
    degree?: string;
    person?: IPerson;
    user?: IUser;
    workPlaceAddress?: IAddress;
    specialties?: IParameter[];
}

export class Employee implements IEmployee {
    constructor(
        public id?: number,
        public position?: string,
        public degree?: string,
        public person?: IPerson,
        public user?: IUser,
        public workPlaceAddress?: IAddress,
        public specialties?: IParameter[]
    ) {}
}
