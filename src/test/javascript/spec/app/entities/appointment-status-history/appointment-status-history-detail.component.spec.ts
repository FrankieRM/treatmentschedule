/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { AppointmentStatusHistoryDetailComponent } from 'app/entities/appointment-status-history/appointment-status-history-detail.component';
import { AppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';

describe('Component Tests', () => {
    describe('AppointmentStatusHistory Management Detail Component', () => {
        let comp: AppointmentStatusHistoryDetailComponent;
        let fixture: ComponentFixture<AppointmentStatusHistoryDetailComponent>;
        const route = ({ data: of({ appointmentStatusHistory: new AppointmentStatusHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [AppointmentStatusHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AppointmentStatusHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AppointmentStatusHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.appointmentStatusHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
