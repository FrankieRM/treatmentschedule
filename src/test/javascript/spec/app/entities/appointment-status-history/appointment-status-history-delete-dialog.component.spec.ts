/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { AppointmentStatusHistoryDeleteDialogComponent } from 'app/entities/appointment-status-history/appointment-status-history-delete-dialog.component';
import { AppointmentStatusHistoryService } from 'app/entities/appointment-status-history/appointment-status-history.service';

describe('Component Tests', () => {
    describe('AppointmentStatusHistory Management Delete Component', () => {
        let comp: AppointmentStatusHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<AppointmentStatusHistoryDeleteDialogComponent>;
        let service: AppointmentStatusHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [AppointmentStatusHistoryDeleteDialogComponent]
            })
                .overrideTemplate(AppointmentStatusHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AppointmentStatusHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppointmentStatusHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
