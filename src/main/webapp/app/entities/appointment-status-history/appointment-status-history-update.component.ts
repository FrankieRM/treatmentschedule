import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';
import { AppointmentStatusHistoryService } from './appointment-status-history.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';
import { IParameter } from 'app/shared/model/parameter.model';
import { ParameterService } from 'app/entities/parameter';

@Component({
    selector: 'jhi-appointment-status-history-update',
    templateUrl: './appointment-status-history-update.component.html'
})
export class AppointmentStatusHistoryUpdateComponent implements OnInit {
    appointmentStatusHistory: IAppointmentStatusHistory;
    isSaving: boolean;

    schedules: ISchedule[];

    appointmentstatuses: IParameter[];
    modifyDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected appointmentStatusHistoryService: AppointmentStatusHistoryService,
        protected scheduleService: ScheduleService,
        protected parameterService: ParameterService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ appointmentStatusHistory }) => {
            this.appointmentStatusHistory = appointmentStatusHistory;
            this.modifyDate =
                this.appointmentStatusHistory.modifyDate != null ? this.appointmentStatusHistory.modifyDate.format(DATE_TIME_FORMAT) : null;
        });
        this.scheduleService.query().subscribe(
            (res: HttpResponse<ISchedule[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'appointmentstatushistory-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.appointmentStatusHistory.appointmentStatus || !this.appointmentStatusHistory.appointmentStatus.id) {
                    this.appointmentstatuses = res.body;
                } else {
                    this.parameterService.find(this.appointmentStatusHistory.appointmentStatus.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.appointmentstatuses = [subRes.body].concat(res.body);
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
        this.appointmentStatusHistory.modifyDate = this.modifyDate != null ? moment(this.modifyDate, DATE_TIME_FORMAT) : null;
        if (this.appointmentStatusHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.appointmentStatusHistoryService.update(this.appointmentStatusHistory));
        } else {
            this.subscribeToSaveResponse(this.appointmentStatusHistoryService.create(this.appointmentStatusHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointmentStatusHistory>>) {
        result.subscribe(
            (res: HttpResponse<IAppointmentStatusHistory>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackParameterById(index: number, item: IParameter) {
        return item.id;
    }
}
