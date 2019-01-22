import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from './schedule.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient';
import { IParameter } from 'app/shared/model/parameter.model';
import { ParameterService } from 'app/entities/parameter';

@Component({
    selector: 'jhi-schedule-update',
    templateUrl: './schedule-update.component.html'
})
export class ScheduleUpdateComponent implements OnInit {
    schedule: ISchedule;
    isSaving: boolean;

    employees: IEmployee[];

    patients: IPatient[];

    situations: IParameter[];
    initialAppointmentDate: string;
    finalAppointmentDate: string;
    duration: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected scheduleService: ScheduleService,
        protected employeeService: EmployeeService,
        protected patientService: PatientService,
        protected parameterService: ParameterService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ schedule }) => {
            this.schedule = schedule;
            this.initialAppointmentDate =
                this.schedule.initialAppointmentDate != null ? this.schedule.initialAppointmentDate.format(DATE_TIME_FORMAT) : null;
            this.finalAppointmentDate =
                this.schedule.finalAppointmentDate != null ? this.schedule.finalAppointmentDate.format(DATE_TIME_FORMAT) : null;
            this.duration = this.schedule.duration != null ? this.schedule.duration.format(DATE_TIME_FORMAT) : null;
        });
        this.employeeService.query({ filter: 'schedule-is-null' }).subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                if (!this.schedule.employee || !this.schedule.employee.id) {
                    this.employees = res.body;
                } else {
                    this.employeeService.find(this.schedule.employee.id).subscribe(
                        (subRes: HttpResponse<IEmployee>) => {
                            this.employees = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.patientService.query({ filter: 'schedule-is-null' }).subscribe(
            (res: HttpResponse<IPatient[]>) => {
                if (!this.schedule.patient || !this.schedule.patient.id) {
                    this.patients = res.body;
                } else {
                    this.patientService.find(this.schedule.patient.id).subscribe(
                        (subRes: HttpResponse<IPatient>) => {
                            this.patients = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'schedule-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.schedule.situation || !this.schedule.situation.id) {
                    this.situations = res.body;
                } else {
                    this.parameterService.find(this.schedule.situation.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.situations = [subRes.body].concat(res.body);
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
        this.schedule.initialAppointmentDate =
            this.initialAppointmentDate != null ? moment(this.initialAppointmentDate, DATE_TIME_FORMAT) : null;
        this.schedule.finalAppointmentDate = this.finalAppointmentDate != null ? moment(this.finalAppointmentDate, DATE_TIME_FORMAT) : null;
        this.schedule.duration = this.duration != null ? moment(this.duration, DATE_TIME_FORMAT) : null;
        if (this.schedule.id !== undefined) {
            this.subscribeToSaveResponse(this.scheduleService.update(this.schedule));
        } else {
            this.subscribeToSaveResponse(this.scheduleService.create(this.schedule));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchedule>>) {
        result.subscribe((res: HttpResponse<ISchedule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }

    trackPatientById(index: number, item: IPatient) {
        return item.id;
    }

    trackParameterById(index: number, item: IParameter) {
        return item.id;
    }
}
