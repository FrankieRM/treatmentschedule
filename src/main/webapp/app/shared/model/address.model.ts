import { IParameter } from 'app/shared/model//parameter.model';

export interface IAddress {
    id?: number;
    descriptionAddress?: string;
    references?: string;
    addressType?: IParameter;
    country?: IParameter;
    department?: IParameter;
    province?: IParameter;
    district?: IParameter;
}

export class Address implements IAddress {
    constructor(
        public id?: number,
        public descriptionAddress?: string,
        public references?: string,
        public addressType?: IParameter,
        public country?: IParameter,
        public department?: IParameter,
        public province?: IParameter,
        public district?: IParameter
    ) {}
}
