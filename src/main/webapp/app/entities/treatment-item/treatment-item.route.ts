import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TreatmentItem } from 'app/shared/model/treatment-item.model';
import { TreatmentItemService } from './treatment-item.service';
import { TreatmentItemComponent } from './treatment-item.component';
import { TreatmentItemDetailComponent } from './treatment-item-detail.component';
import { TreatmentItemUpdateComponent } from './treatment-item-update.component';
import { TreatmentItemDeletePopupComponent } from './treatment-item-delete-dialog.component';
import { ITreatmentItem } from 'app/shared/model/treatment-item.model';

@Injectable({ providedIn: 'root' })
export class TreatmentItemResolve implements Resolve<ITreatmentItem> {
    constructor(private service: TreatmentItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TreatmentItem> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TreatmentItem>) => response.ok),
                map((treatmentItem: HttpResponse<TreatmentItem>) => treatmentItem.body)
            );
        }
        return of(new TreatmentItem());
    }
}

export const treatmentItemRoute: Routes = [
    {
        path: 'treatment-item',
        component: TreatmentItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.treatmentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'treatment-item/:id/view',
        component: TreatmentItemDetailComponent,
        resolve: {
            treatmentItem: TreatmentItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.treatmentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'treatment-item/new',
        component: TreatmentItemUpdateComponent,
        resolve: {
            treatmentItem: TreatmentItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.treatmentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'treatment-item/:id/edit',
        component: TreatmentItemUpdateComponent,
        resolve: {
            treatmentItem: TreatmentItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.treatmentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const treatmentItemPopupRoute: Routes = [
    {
        path: 'treatment-item/:id/delete',
        component: TreatmentItemDeletePopupComponent,
        resolve: {
            treatmentItem: TreatmentItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.treatmentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
