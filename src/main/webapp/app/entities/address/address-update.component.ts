import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { IParameter } from 'app/shared/model/parameter.model';
import { ParameterService } from 'app/entities/parameter';

@Component({
    selector: 'jhi-address-update',
    templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent implements OnInit {
    address: IAddress;
    isSaving: boolean;

    addresstypes: IParameter[];

    countries: IParameter[];

    departments: IParameter[];

    provinces: IParameter[];

    districts: IParameter[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected addressService: AddressService,
        protected parameterService: ParameterService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
        this.parameterService.query({ filter: 'address-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.address.addressType || !this.address.addressType.id) {
                    this.addresstypes = res.body;
                } else {
                    this.parameterService.find(this.address.addressType.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.addresstypes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'address-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.address.country || !this.address.country.id) {
                    this.countries = res.body;
                } else {
                    this.parameterService.find(this.address.country.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.countries = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'address-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.address.department || !this.address.department.id) {
                    this.departments = res.body;
                } else {
                    this.parameterService.find(this.address.department.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.departments = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'address-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.address.province || !this.address.province.id) {
                    this.provinces = res.body;
                } else {
                    this.parameterService.find(this.address.province.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.provinces = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'address-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.address.district || !this.address.district.id) {
                    this.districts = res.body;
                } else {
                    this.parameterService.find(this.address.district.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.districts = [subRes.body].concat(res.body);
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
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(this.addressService.create(this.address));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>) {
        result.subscribe((res: HttpResponse<IAddress>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
