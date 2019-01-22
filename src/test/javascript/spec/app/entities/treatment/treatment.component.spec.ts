/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { TreatmentComponent } from 'app/entities/treatment/treatment.component';
import { TreatmentService } from 'app/entities/treatment/treatment.service';
import { Treatment } from 'app/shared/model/treatment.model';

describe('Component Tests', () => {
    describe('Treatment Management Component', () => {
        let comp: TreatmentComponent;
        let fixture: ComponentFixture<TreatmentComponent>;
        let service: TreatmentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [TreatmentComponent],
                providers: []
            })
                .overrideTemplate(TreatmentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TreatmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TreatmentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Treatment(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.treatments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
