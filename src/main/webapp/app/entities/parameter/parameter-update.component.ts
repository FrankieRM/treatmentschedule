import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IParameter } from 'app/shared/model/parameter.model';
import { ParameterService } from './parameter.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';

@Component({
    selector: 'jhi-parameter-update',
    templateUrl: './parameter-update.component.html'
})
export class ParameterUpdateComponent implements OnInit {
    parameter: IParameter;
    isSaving: boolean;

    parameters: IParameter[];

    employees: IEmployee[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected parameterService: ParameterService,
        protected employeeService: EmployeeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parameter }) => {
            this.parameter = parameter;
        });
        this.parameterService.search({ query: '!(parent:*)' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                this.parameters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameter.parent = null;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parameter.id !== undefined) {
            this.subscribeToSaveResponse(this.parameterService.update(this.parameter));
        } else {
            this.subscribeToSaveResponse(this.parameterService.create(this.parameter));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParameter>>) {
        result.subscribe((res: HttpResponse<IParameter>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackParameterById(index: number, item: IParameter) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
