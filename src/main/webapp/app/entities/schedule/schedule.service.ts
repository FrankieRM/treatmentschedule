import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchedule } from 'app/shared/model/schedule.model';

type EntityResponseType = HttpResponse<ISchedule>;
type EntityArrayResponseType = HttpResponse<ISchedule[]>;

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    public resourceUrl = SERVER_API_URL + 'api/schedules';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/schedules';

    constructor(protected http: HttpClient) {}

    create(schedule: ISchedule): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schedule);
        return this.http
            .post<ISchedule>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(schedule: ISchedule): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schedule);
        return this.http
            .put<ISchedule>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISchedule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISchedule[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(schedule: ISchedule): ISchedule {
        const copy: ISchedule = Object.assign({}, schedule, {
            initialAppointmentDate:
                schedule.initialAppointmentDate != null && schedule.initialAppointmentDate.isValid()
                    ? schedule.initialAppointmentDate.toJSON()
                    : null,
            finalAppointmentDate:
                schedule.finalAppointmentDate != null && schedule.finalAppointmentDate.isValid()
                    ? schedule.finalAppointmentDate.toJSON()
                    : null,
            duration: schedule.duration != null && schedule.duration.isValid() ? schedule.duration.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.initialAppointmentDate = res.body.initialAppointmentDate != null ? moment(res.body.initialAppointmentDate) : null;
            res.body.finalAppointmentDate = res.body.finalAppointmentDate != null ? moment(res.body.finalAppointmentDate) : null;
            res.body.duration = res.body.duration != null ? moment(res.body.duration) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((schedule: ISchedule) => {
                schedule.initialAppointmentDate = schedule.initialAppointmentDate != null ? moment(schedule.initialAppointmentDate) : null;
                schedule.finalAppointmentDate = schedule.finalAppointmentDate != null ? moment(schedule.finalAppointmentDate) : null;
                schedule.duration = schedule.duration != null ? moment(schedule.duration) : null;
            });
        }
        return res;
    }
}
