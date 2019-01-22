import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITreatmentItem } from 'app/shared/model/treatment-item.model';

type EntityResponseType = HttpResponse<ITreatmentItem>;
type EntityArrayResponseType = HttpResponse<ITreatmentItem[]>;

@Injectable({ providedIn: 'root' })
export class TreatmentItemService {
    public resourceUrl = SERVER_API_URL + 'api/treatment-items';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/treatment-items';

    constructor(protected http: HttpClient) {}

    create(treatmentItem: ITreatmentItem): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(treatmentItem);
        return this.http
            .post<ITreatmentItem>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(treatmentItem: ITreatmentItem): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(treatmentItem);
        return this.http
            .put<ITreatmentItem>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITreatmentItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITreatmentItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITreatmentItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(treatmentItem: ITreatmentItem): ITreatmentItem {
        const copy: ITreatmentItem = Object.assign({}, treatmentItem, {
            initialServiceDate:
                treatmentItem.initialServiceDate != null && treatmentItem.initialServiceDate.isValid()
                    ? treatmentItem.initialServiceDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.initialServiceDate = res.body.initialServiceDate != null ? moment(res.body.initialServiceDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((treatmentItem: ITreatmentItem) => {
                treatmentItem.initialServiceDate =
                    treatmentItem.initialServiceDate != null ? moment(treatmentItem.initialServiceDate) : null;
            });
        }
        return res;
    }
}
