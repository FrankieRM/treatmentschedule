import { IPerson } from 'app/shared/model//person.model';
import { IParameter } from 'app/shared/model//parameter.model';

export interface IPatient {
    id?: number;
    internNumber?: string;
    commune?: string;
    occupation?: string;
    employer?: string;
    representative?: string;
    reference?: string;
    observations?: string;
    person?: IPerson;
    sex?: IParameter;
}

export class Patient implements IPatient {
    constructor(
        public id?: number,
        public internNumber?: string,
        public commune?: string,
        public occupation?: string,
        public employer?: string,
        public representative?: string,
        public reference?: string,
        public observations?: string,
        public person?: IPerson,
        public sex?: IParameter
    ) {}
}
