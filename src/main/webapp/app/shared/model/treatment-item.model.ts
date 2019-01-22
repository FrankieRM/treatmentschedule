import { Moment } from 'moment';
import { ITreatment } from 'app/shared/model//treatment.model';
import { IParameter } from 'app/shared/model//parameter.model';
import { IItem } from 'app/shared/model//item.model';

export interface ITreatmentItem {
    id?: number;
    initialServiceDate?: Moment;
    discount?: number;
    total?: number;
    treatment?: ITreatment;
    paymentStatus?: IParameter;
    items?: IItem[];
}

export class TreatmentItem implements ITreatmentItem {
    constructor(
        public id?: number,
        public initialServiceDate?: Moment,
        public discount?: number,
        public total?: number,
        public treatment?: ITreatment,
        public paymentStatus?: IParameter,
        public items?: IItem[]
    ) {}
}
