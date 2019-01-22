import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';
import { IParameter } from 'app/shared/model/parameter.model';
import { ParameterService } from 'app/entities/parameter';

@Component({
    selector: 'jhi-contact-update',
    templateUrl: './contact-update.component.html'
})
export class ContactUpdateComponent implements OnInit {
    contact: IContact;
    isSaving: boolean;

    people: IPerson[];

    contacttypes: IParameter[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected contactService: ContactService,
        protected personService: PersonService,
        protected parameterService: ParameterService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contact }) => {
            this.contact = contact;
        });
        this.personService.query().subscribe(
            (res: HttpResponse<IPerson[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterService.query({ filter: 'contact-is-null' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                if (!this.contact.contactType || !this.contact.contactType.id) {
                    this.contacttypes = res.body;
                } else {
                    this.parameterService.find(this.contact.contactType.id).subscribe(
                        (subRes: HttpResponse<IParameter>) => {
                            this.contacttypes = [subRes.body].concat(res.body);
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
        if (this.contact.id !== undefined) {
            this.subscribeToSaveResponse(this.contactService.update(this.contact));
        } else {
            this.subscribeToSaveResponse(this.contactService.create(this.contact));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContact>>) {
        result.subscribe((res: HttpResponse<IContact>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
