import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model//employee.model';
import { IPatient } from 'app/shared/model//patient.model';
import { IParameter } from 'app/shared/model//parameter.model';
import { IAppointmentStatusHistory } from 'app/shared/model//appointment-status-history.model';

export interface ISchedule {
    id?: number;
    initialAppointmentDate?: Moment;
    finalAppointmentDate?: Moment;
    duration?: Moment;
    employee?: IEmployee;
    patient?: IPatient;
    situation?: IParameter;
    appointmentStatusHistories?: IAppointmentStatusHistory[];
}

export class Schedule implements ISchedule {
    constructor(
        public id?: number,
        public initialAppointmentDate?: Moment,
        public finalAppointmentDate?: Moment,
        public duration?: Moment,
        public employee?: IEmployee,
        public patient?: IPatient,
        public situation?: IParameter,
        public appointmentStatusHistories?: IAppointmentStatusHistory[]
    ) {}
}
