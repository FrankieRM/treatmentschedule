import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TreatmentscheduleTreatmentModule } from './treatment/treatment.module';
import { TreatmentscheduleTreatmentItemModule } from './treatment-item/treatment-item.module';
import { TreatmentscheduleItemModule } from './item/item.module';
import { TreatmentscheduleScheduleModule } from './schedule/schedule.module';
import { TreatmentscheduleAppointmentStatusHistoryModule } from './appointment-status-history/appointment-status-history.module';
import { TreatmentschedulePatientModule } from './patient/patient.module';
import { TreatmentscheduleEmployeeModule } from './employee/employee.module';
import { TreatmentscheduleAddressModule } from './address/address.module';
import { TreatmentschedulePersonModule } from './person/person.module';
import { TreatmentscheduleContactModule } from './contact/contact.module';
import { TreatmentscheduleParameterModule } from './parameter/parameter.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TreatmentscheduleTreatmentModule,
        TreatmentscheduleTreatmentItemModule,
        TreatmentscheduleItemModule,
        TreatmentscheduleScheduleModule,
        TreatmentscheduleAppointmentStatusHistoryModule,
        TreatmentschedulePatientModule,
        TreatmentscheduleEmployeeModule,
        TreatmentscheduleAddressModule,
        TreatmentschedulePersonModule,
        TreatmentscheduleContactModule,
        TreatmentscheduleParameterModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreatmentscheduleEntityModule {}
