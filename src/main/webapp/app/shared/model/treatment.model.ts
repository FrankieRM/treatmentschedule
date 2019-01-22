import { ISchedule } from 'app/shared/model//schedule.model';
import { ITreatmentItem } from 'app/shared/model//treatment-item.model';

export interface ITreatment {
    id?: number;
    discount?: number;
    warningsAboutPatient?: string;
    schedule?: ISchedule;
    treatmentItems?: ITreatmentItem[];
}

export class Treatment implements ITreatment {
    constructor(
        public id?: number,
        public discount?: number,
        public warningsAboutPatient?: string,
        public schedule?: ISchedule,
        public treatmentItems?: ITreatmentItem[]
    ) {}
}
