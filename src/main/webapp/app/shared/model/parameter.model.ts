import { IParameter } from 'app/shared/model//parameter.model';
import { IEmployee } from 'app/shared/model//employee.model';

export interface IParameter {
    id?: number;
    value?: string;
    status?: boolean;
    parent?: IParameter;
    employees?: IEmployee[];
}

export class Parameter implements IParameter {
    constructor(
        public id?: number,
        public value?: string,
        public status?: boolean,
        public parent?: IParameter,
        public employees?: IEmployee[]
    ) {
        this.status = this.status || false;
    }
}
