/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { ParameterDeleteDialogComponent } from 'app/entities/parameter/parameter-delete-dialog.component';
import { ParameterService } from 'app/entities/parameter/parameter.service';

describe('Component Tests', () => {
    describe('Parameter Management Delete Component', () => {
        let comp: ParameterDeleteDialogComponent;
        let fixture: ComponentFixture<ParameterDeleteDialogComponent>;
        let service: ParameterService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [ParameterDeleteDialogComponent]
            })
                .overrideTemplate(ParameterDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParameterDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParameterService);
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
