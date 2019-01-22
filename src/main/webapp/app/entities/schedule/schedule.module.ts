import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreatmentscheduleSharedModule } from 'app/shared';
import {
    ScheduleComponent,
    ScheduleDetailComponent,
    ScheduleUpdateComponent,
    ScheduleDeletePopupComponent,
    ScheduleDeleteDialogComponent,
    scheduleRoute,
    schedulePopupRoute
} from './';

const ENTITY_STATES = [...scheduleRoute, ...schedulePopupRoute];

@NgModule({
    imports: [TreatmentscheduleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ScheduleComponent,
        ScheduleDetailComponent,
        ScheduleUpdateComponent,
        ScheduleDeleteDialogComponent,
        ScheduleDeletePopupComponent
    ],
    entryComponents: [ScheduleComponent, ScheduleUpdateComponent, ScheduleDeleteDialogComponent, ScheduleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreatmentscheduleScheduleModule {}
