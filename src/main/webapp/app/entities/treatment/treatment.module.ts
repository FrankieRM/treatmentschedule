import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreatmentscheduleSharedModule } from 'app/shared';
import {
    TreatmentComponent,
    TreatmentDetailComponent,
    TreatmentUpdateComponent,
    TreatmentDeletePopupComponent,
    TreatmentDeleteDialogComponent,
    treatmentRoute,
    treatmentPopupRoute
} from './';

const ENTITY_STATES = [...treatmentRoute, ...treatmentPopupRoute];

@NgModule({
    imports: [TreatmentscheduleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TreatmentComponent,
        TreatmentDetailComponent,
        TreatmentUpdateComponent,
        TreatmentDeleteDialogComponent,
        TreatmentDeletePopupComponent
    ],
    entryComponents: [TreatmentComponent, TreatmentUpdateComponent, TreatmentDeleteDialogComponent, TreatmentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreatmentscheduleTreatmentModule {}
