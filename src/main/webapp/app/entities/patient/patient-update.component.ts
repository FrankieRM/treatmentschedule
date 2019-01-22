import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from './patient.service';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';
import { IParameter } from 'app/shared/model/parameter.model';
import { ParameterService } from 'app/entities/parameter';

@Component({
    selector: 'jhi-patient-update',
    templateUrl: './patient-update.component.html'
})
export class PatientUpdateComponent implements OnInit {
    patient: IPatient;
    isSaving: boolean;

    people: IPerson[];

    sexes: IParameter[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected patientService: PatientService,
        protected personService: PersonService,
        protected parameterService: ParameterService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ patient }) => {
            this.patient = patient;
        });
        this.personService.query({ filter: 'patient-is-null' }).subscribe(
            (res: HttpResponse<IPerson[]>) => {
                if (!this.patient.person || !this.patient.person.id) {
                    this.people = res.body;
                } else {
                    this.personService.find(this.patient.person.id).subscribe(
                        (subRes: HttpResponse<IPerson>) => {
                            this.people = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'patient-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.patient.sex || !this.patient.sex.id) {
                    this.sexes = res.body;
                } else {
                    this.parameterService.find(this.patient.sex.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.sexes = [subRes.body].concat(res.body);
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
        if (this.patient.id !== undefined) {
            this.subscribeToSaveResponse(this.patientService.update(this.patient));
        } else {
            this.subscribeToSaveResponse(this.patientService.create(this.patient));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatient>>) {
        result.subscribe((res: HttpResponse<IPatient>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonById(index: number, item: IPerson) {
        return item.id;
    }

    trackParameterById(index: number, item: IParameter) {
        return item.id;
    }
}
