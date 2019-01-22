import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';
import { AccountService } from 'app/core';
import { AppointmentStatusHistoryService } from './appointment-status-history.service';

@Component({
    selector: 'jhi-appointment-status-history',
    templateUrl: './appointment-status-history.component.html'
})
export class AppointmentStatusHistoryComponent implements OnInit, OnDestroy {
    appointmentStatusHistories: IAppointmentStatusHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected appointmentStatusHistoryService: AppointmentStatusHistoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.appointmentStatusHistoryService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IAppointmentStatusHistory[]>) => (this.appointmentStatusHistories = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.appointmentStatusHistoryService.query().subscribe(
            (res: HttpResponse<IAppointmentStatusHistory[]>) => {
                this.appointmentStatusHistories = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAppointmentStatusHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAppointmentStatusHistory) {
        return item.id;
    }

    registerChangeInAppointmentStatusHistories() {
        this.eventSubscriber = this.eventManager.subscribe('appointmentStatusHistoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
