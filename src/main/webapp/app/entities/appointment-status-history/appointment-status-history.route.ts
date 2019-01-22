import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';
import { AppointmentStatusHistoryService } from './appointment-status-history.service';
import { AppointmentStatusHistoryComponent } from './appointment-status-history.component';
import { AppointmentStatusHistoryDetailComponent } from './appointment-status-history-detail.component';
import { AppointmentStatusHistoryUpdateComponent } from './appointment-status-history-update.component';
import { AppointmentStatusHistoryDeletePopupComponent } from './appointment-status-history-delete-dialog.component';
import { IAppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';

@Injectable({ providedIn: 'root' })
export class AppointmentStatusHistoryResolve implements Resolve<IAppointmentStatusHistory> {
    constructor(private service: AppointmentStatusHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppointmentStatusHistory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AppointmentStatusHistory>) => response.ok),
                map((appointmentStatusHistory: HttpResponse<AppointmentStatusHistory>) => appointmentStatusHistory.body)
            );
        }
        return of(new AppointmentStatusHistory());
    }
}

export const appointmentStatusHistoryRoute: Routes = [
    {
        path: 'appointment-status-history',
        component: AppointmentStatusHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.appointmentStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'appointment-status-history/:id/view',
        component: AppointmentStatusHistoryDetailComponent,
        resolve: {
            appointmentStatusHistory: AppointmentStatusHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.appointmentStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'appointment-status-history/new',
        component: AppointmentStatusHistoryUpdateComponent,
        resolve: {
            appointmentStatusHistory: AppointmentStatusHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.appointmentStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'appointment-status-history/:id/edit',
        component: AppointmentStatusHistoryUpdateComponent,
        resolve: {
            appointmentStatusHistory: AppointmentStatusHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.appointmentStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appointmentStatusHistoryPopupRoute: Routes = [
    {
        path: 'appointment-status-history/:id/delete',
        component: AppointmentStatusHistoryDeletePopupComponent,
        resolve: {
            appointmentStatusHistory: AppointmentStatusHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'treatmentscheduleApp.appointmentStatusHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
