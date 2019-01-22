import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreatmentscheduleSharedModule } from 'app/shared';
import {
    TreatmentItemComponent,
    TreatmentItemDetailComponent,
    TreatmentItemUpdateComponent,
    TreatmentItemDeletePopupComponent,
    TreatmentItemDeleteDialogComponent,
    treatmentItemRoute,
    treatmentItemPopupRoute
} from './';

const ENTITY_STATES = [...treatmentItemRoute, ...treatmentItemPopupRoute];

@NgModule({
    imports: [TreatmentscheduleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TreatmentItemComponent,
        TreatmentItemDetailComponent,
        TreatmentItemUpdateComponent,
        TreatmentItemDeleteDialogComponent,
        TreatmentItemDeletePopupComponent
    ],
    entryComponents: [
        TreatmentItemComponent,
        TreatmentItemUpdateComponent,
        TreatmentItemDeleteDialogComponent,
        TreatmentItemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreatmentscheduleTreatmentItemModule {}
