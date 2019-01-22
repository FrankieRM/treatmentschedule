import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITreatmentItem } from 'app/shared/model/treatment-item.model';
import { AccountService } from 'app/core';
import { TreatmentItemService } from './treatment-item.service';

@Component({
    selector: 'jhi-treatment-item',
    templateUrl: './treatment-item.component.html'
})
export class TreatmentItemComponent implements OnInit, OnDestroy {
    treatmentItems: ITreatmentItem[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected treatmentItemService: TreatmentItemService,
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
            this.treatmentItemService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITreatmentItem[]>) => (this.treatmentItems = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.treatmentItemService.query().subscribe(
            (res: HttpResponse<ITreatmentItem[]>) => {
                this.treatmentItems = res.body;
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
        this.registerChangeInTreatmentItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITreatmentItem) {
        return item.id;
    }

    registerChangeInTreatmentItems() {
        this.eventSubscriber = this.eventManager.subscribe('treatmentItemListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
