import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITreatment } from 'app/shared/model/treatment.model';
import { TreatmentService } from './treatment.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';

@Component({
    selector: 'jhi-treatment-update',
    templateUrl: './treatment-update.component.html'
})
export class TreatmentUpdateComponent implements OnInit {
    treatment: ITreatment;
    isSaving: boolean;

    schedules: ISchedule[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected treatmentService: TreatmentService,
        protected scheduleService: ScheduleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ treatment }) => {
            this.treatment = treatment;
        });
        this.scheduleService.query({ filter: 'treatment-is-null' }).subscribe(
            (res: HttpResponse<ISchedule[]>) => {
                if (!this.treatment.schedule || !this.treatment.schedule.id) {
                    this.schedules = res.body;
                } else {
                    this.scheduleService.find(this.treatment.schedule.id).subscribe(
                        (subRes: HttpResponse<ISchedule>) => {
                            this.schedules = [subRes.body].concat(res.body);
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
        if (this.treatment.id !== undefined) {
            this.subscribeToSaveResponse(this.treatmentService.update(this.treatment));
        } else {
            this.subscribeToSaveResponse(this.treatmentService.create(this.treatment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITreatment>>) {
        result.subscribe((res: HttpResponse<ITreatment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackScheduleById(index: number, item: ISchedule) {
        return item.id;
    }
}
