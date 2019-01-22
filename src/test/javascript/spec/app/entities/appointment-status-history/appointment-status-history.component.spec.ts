/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { AppointmentStatusHistoryComponent } from 'app/entities/appointment-status-history/appointment-status-history.component';
import { AppointmentStatusHistoryService } from 'app/entities/appointment-status-history/appointment-status-history.service';
import { AppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';

describe('Component Tests', () => {
    describe('AppointmentStatusHistory Management Component', () => {
        let comp: AppointmentStatusHistoryComponent;
        let fixture: ComponentFixture<AppointmentStatusHistoryComponent>;
        let service: AppointmentStatusHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [AppointmentStatusHistoryComponent],
                providers: []
            })
                .overrideTemplate(AppointmentStatusHistoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AppointmentStatusHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppointmentStatusHistoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AppointmentStatusHistory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.appointmentStatusHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
