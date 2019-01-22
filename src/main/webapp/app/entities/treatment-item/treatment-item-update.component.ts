import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ITreatmentItem } from 'app/shared/model/treatment-item.model';
import { TreatmentItemService } from './treatment-item.service';
import { ITreatment } from 'app/shared/model/treatment.model';
import { TreatmentService } from 'app/entities/treatment';
import { IParameter } from 'app/shared/model/parameter.model';
import { ParameterService } from 'app/entities/parameter';

@Component({
    selector: 'jhi-treatment-item-update',
    templateUrl: './treatment-item-update.component.html'
})
export class TreatmentItemUpdateComponent implements OnInit {
    treatmentItem: ITreatmentItem;
    isSaving: boolean;

    treatments: ITreatment[];

    paymentstatuses: IParameter[];
    initialServiceDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected treatmentItemService: TreatmentItemService,
        protected treatmentService: TreatmentService,
        protected parameterService: ParameterService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ treatmentItem }) => {
            this.treatmentItem = treatmentItem;
            this.initialServiceDate =
                this.treatmentItem.initialServiceDate != null ? this.treatmentItem.initialServiceDate.format(DATE_TIME_FORMAT) : null;
        });
        this.treatmentService.query().subscribe(
            (res: HttpResponse<ITreatment[]>) => {
                this.treatments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'treatmentitem-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.treatmentItem.paymentStatus || !this.treatmentItem.paymentStatus.id) {
                    this.paymentstatuses = res.body;
                } else {
                    this.parameterService.find(this.treatmentItem.paymentStatus.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.paymentstatuses = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.treatmentItem.initialServiceDate = this.initialServiceDate != null ? moment(this.initialServiceDate, DATE_TIME_FORMAT) : null;
        if (this.treatmentItem.id !== undefined) {
            this.subscribeToSaveResponse(this.treatmentItemService.update(this.treatmentItem));
        } else {
            this.subscribeToSaveResponse(this.treatmentItemService.create(this.treatmentItem));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITreatmentItem>>) {
        result.subscribe((res: HttpResponse<ITreatmentItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTreatmentById(index: number, item: ITreatment) {
        return item.id;
    }

    trackParameterById(index: number, item: IParameter) {
        return item.id;
    }
}
