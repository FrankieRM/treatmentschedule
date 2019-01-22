/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { ParameterUpdateComponent } from 'app/entities/parameter/parameter-update.component';
import { ParameterService } from 'app/entities/parameter/parameter.service';
import { Parameter } from 'app/shared/model/parameter.model';

describe('Component Tests', () => {
    describe('Parameter Management Update Component', () => {
        let comp: ParameterUpdateComponent;
        let fixture: ComponentFixture<ParameterUpdateComponent>;
        let service: ParameterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [ParameterUpdateComponent]
            })
                .overrideTemplate(ParameterUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParameterUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParameterService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Parameter(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.parameter = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Parameter();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.parameter = entity;
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
