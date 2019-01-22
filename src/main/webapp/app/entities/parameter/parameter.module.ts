import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreatmentscheduleSharedModule } from 'app/shared';
import {
    ParameterComponent,
    ParameterDetailComponent,
    ParameterUpdateComponent,
    ParameterDeletePopupComponent,
    ParameterDeleteDialogComponent,
    parameterRoute,
    parameterPopupRoute
} from './';

const ENTITY_STATES = [...parameterRoute, ...parameterPopupRoute];

@NgModule({
    imports: [TreatmentscheduleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ParameterComponent,
        ParameterDetailComponent,
        ParameterUpdateComponent,
        ParameterDeleteDialogComponent,
        ParameterDeletePopupComponent
    ],
    entryComponents: [ParameterComponent, ParameterUpdateComponent, ParameterDeleteDialogComponent, ParameterDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreatmentscheduleParameterModule {}
