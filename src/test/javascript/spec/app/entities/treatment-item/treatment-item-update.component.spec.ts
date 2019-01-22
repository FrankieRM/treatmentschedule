/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { TreatmentItemUpdateComponent } from 'app/entities/treatment-item/treatment-item-update.component';
import { TreatmentItemService } from 'app/entities/treatment-item/treatment-item.service';
import { TreatmentItem } from 'app/shared/model/treatment-item.model';

describe('Component Tests', () => {
    describe('TreatmentItem Management Update Component', () => {
        let comp: TreatmentItemUpdateComponent;
        let fixture: ComponentFixture<TreatmentItemUpdateComponent>;
        let service: TreatmentItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [TreatmentItemUpdateComponent]
            })
                .overrideTemplate(TreatmentItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TreatmentItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TreatmentItemService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TreatmentItem(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.treatmentItem = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TreatmentItem();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.treatmentItem = entity;
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
