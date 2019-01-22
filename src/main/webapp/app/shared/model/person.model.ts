import { Moment } from 'moment';
import { IAddress } from 'app/shared/model//address.model';
import { IParameter } from 'app/shared/model//parameter.model';
import { IContact } from 'app/shared/model//contact.model';

export interface IPerson {
    id?: number;
    firstName?: string;
    lastName?: string;
    documentNumber?: string;
    gender?: string;
    birthDay?: Moment;
    years?: number;
    address?: IAddress;
    documentType?: IParameter;
    contacts?: IContact[];
}

export class Person implements IPerson {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public documentNumber?: string,
        public gender?: string,
        public birthDay?: Moment,
        public years?: number,
        public address?: IAddress,
        public documentType?: IParameter,
        public contacts?: IContact[]
    ) {}
}
