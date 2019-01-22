import { IPerson } from 'app/shared/model//person.model';
import { IParameter } from 'app/shared/model//parameter.model';

export interface IContact {
    id?: number;
    value?: string;
    person?: IPerson;
    contactType?: IParameter;
}

export class Contact implements IContact {
    constructor(public id?: number, public value?: string, public person?: IPerson, public contactType?: IParameter) {}
}
