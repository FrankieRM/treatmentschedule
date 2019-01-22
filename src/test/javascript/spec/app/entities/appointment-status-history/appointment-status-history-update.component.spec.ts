/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { AppointmentStatusHistoryUpdateComponent } from 'app/entities/appointment-status-history/appointment-status-history-update.component';
import { AppointmentStatusHistoryService } from 'app/entities/appointment-status-history/appointment-status-history.service';
import { AppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';

describe('Component Tests', () => {
    describe('AppointmentStatusHistory Management Update Component', () => {
        let comp: AppointmentStatusHistoryUpdateComponent;
        let fixture: ComponentFixture<AppointmentStatusHistoryUpdateComponent>;
        let service: AppointmentStatusHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [AppointmentStatusHistoryUpdateComponent]
            })
                .overrideTemplate(AppointmentStatusHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AppointmentStatusHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppointmentStatusHistoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AppointmentStatusHistory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.appointmentStatusHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AppointmentStatusHistory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.appointmentStatusHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
