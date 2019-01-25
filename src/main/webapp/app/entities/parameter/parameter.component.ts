import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IParameter, Parameter } from 'app/shared/model/parameter.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ParameterService } from './parameter.service';

@Component({
    selector: 'jhi-parameter',
    templateUrl: './parameter.component.html'
})
export class ParameterComponent implements OnInit, OnDestroy {
    currentAccount: any;
    parameters: IParameter[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    customSearch: any;
    parameterStatusActivated: any;
    parameterStatusDesactivated: any;
    parameterParent?: IParameter;
    parametersParents: IParameter[];

    constructor(
        protected parameterService: ParameterService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.customSearch) {
            this.parameterService
                .search({
                    page: this.page - 1,
                    query: this.customSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IParameter[]>) => this.paginateParameters(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.parameterService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IParameter[]>) => this.paginateParameters(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/parameter'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/parameter',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.search(this.currentSearch);
    }

    search(query) {
        this.customSearch = '';

        if (this.parameterParent) {
            this.customSearch = 'parent.id:' + this.parameterParent.id;
        }

        if (this.parameterStatusActivated === true && !this.parameterStatusDesactivated) {
            if (this.customSearch) {
                this.customSearch += ' && status:true';
            } else {
                this.customSearch = 'status:true';
            }
        }
        if (!this.parameterStatusActivated && this.parameterStatusDesactivated === true) {
            if (this.customSearch) {
                this.customSearch += ' && status:false';
            } else {
                this.customSearch = 'status:false';
            }
        }

        if (query) {
            if (this.customSearch) {
                this.customSearch += ' && ' + query;
            } else {
                this.customSearch = query;
            }
        }

        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/parameter',
            {
                search: this.customSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParameters();
        this.parameterService.search({ query: '!(parent:*)' }).subscribe(
            (res: HttpResponse<IParameter[]>) => {
                this.parametersParents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parameterParent = null;
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParameter) {
        return item.id;
    }

    registerChangeInParameters() {
        this.eventSubscriber = this.eventManager.subscribe('parameterListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateParameters(data: IParameter[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.parameters = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackParameterById(index: number, item: IParameter) {
        return item.id;
    }
}
