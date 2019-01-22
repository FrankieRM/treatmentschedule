import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreatmentscheduleSharedModule } from 'app/shared';
import {
    AppointmentStatusHistoryComponent,
    AppointmentStatusHistoryDetailComponent,
    AppointmentStatusHistoryUpdateComponent,
    AppointmentStatusHistoryDeletePopupComponent,
    AppointmentStatusHistoryDeleteDialogComponent,
    appointmentStatusHistoryRoute,
    appointmentStatusHistoryPopupRoute
} from './';

const ENTITY_STATES = [...appointmentStatusHistoryRoute, ...appointmentStatusHistoryPopupRoute];

@NgModule({
    imports: [TreatmentscheduleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AppointmentStatusHistoryComponent,
        AppointmentStatusHistoryDetailComponent,
        AppointmentStatusHistoryUpdateComponent,
        AppointmentStatusHistoryDeleteDialogComponent,
        AppointmentStatusHistoryDeletePopupComponent
    ],
    entryComponents: [
        AppointmentStatusHistoryComponent,
        AppointmentStatusHistoryUpdateComponent,
        AppointmentStatusHistoryDeleteDialogComponent,
        AppointmentStatusHistoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreatmentscheduleAppointmentStatusHistoryModule {}
