import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';

type EntityResponseType = HttpResponse<IAppointmentStatusHistory>;
type EntityArrayResponseType = HttpResponse<IAppointmentStatusHistory[]>;

@Injectable({ providedIn: 'root' })
export class AppointmentStatusHistoryService {
    public resourceUrl = SERVER_API_URL + 'api/appointment-status-histories';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/appointment-status-histories';

    constructor(protected http: HttpClient) {}

    create(appointmentStatusHistory: IAppointmentStatusHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(appointmentStatusHistory);
        return this.http
            .post<IAppointmentStatusHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(appointmentStatusHistory: IAppointmentStatusHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(appointmentStatusHistory);
        return this.http
            .put<IAppointmentStatusHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAppointmentStatusHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAppointmentStatusHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAppointmentStatusHistory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(appointmentStatusHistory: IAppointmentStatusHistory): IAppointmentStatusHistory {
        const copy: IAppointmentStatusHistory = Object.assign({}, appointmentStatusHistory, {
            modifyDate:
                appointmentStatusHistory.modifyDate != null && appointmentStatusHistory.modifyDate.isValid()
                    ? appointmentStatusHistory.modifyDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.modifyDate = res.body.modifyDate != null ? moment(res.body.modifyDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((appointmentStatusHistory: IAppointmentStatusHistory) => {
                appointmentStatusHistory.modifyDate =
                    appointmentStatusHistory.modifyDate != null ? moment(appointmentStatusHistory.modifyDate) : null;
            });
        }
        return res;
    }
}
