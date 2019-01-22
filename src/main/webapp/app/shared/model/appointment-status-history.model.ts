import { Moment } from 'moment';
import { ISchedule } from 'app/shared/model//schedule.model';
import { IParameter } from 'app/shared/model//parameter.model';

export interface IAppointmentStatusHistory {
    id?: number;
    modifyDate?: Moment;
    schedule?: ISchedule;
    appointmentStatus?: IParameter;
}

export class AppointmentStatusHistory implements IAppointmentStatusHistory {
    constructor(public id?: number, public modifyDate?: Moment, public schedule?: ISchedule, public appointmentStatus?: IParameter) {}
}
