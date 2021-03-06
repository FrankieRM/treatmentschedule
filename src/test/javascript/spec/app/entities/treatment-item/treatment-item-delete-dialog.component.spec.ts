/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { TreatmentItemDeleteDialogComponent } from 'app/entities/treatment-item/treatment-item-delete-dialog.component';
import { TreatmentItemService } from 'app/entities/treatment-item/treatment-item.service';

describe('Component Tests', () => {
    describe('TreatmentItem Management Delete Component', () => {
        let comp: TreatmentItemDeleteDialogComponent;
        let fixture: ComponentFixture<TreatmentItemDeleteDialogComponent>;
        let service: TreatmentItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [TreatmentItemDeleteDialogComponent]
            })
                .overrideTemplate(TreatmentItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TreatmentItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TreatmentItemService);
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
