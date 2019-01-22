/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { TreatmentItemComponent } from 'app/entities/treatment-item/treatment-item.component';
import { TreatmentItemService } from 'app/entities/treatment-item/treatment-item.service';
import { TreatmentItem } from 'app/shared/model/treatment-item.model';

describe('Component Tests', () => {
    describe('TreatmentItem Management Component', () => {
        let comp: TreatmentItemComponent;
        let fixture: ComponentFixture<TreatmentItemComponent>;
        let service: TreatmentItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [TreatmentItemComponent],
                providers: []
            })
                .overrideTemplate(TreatmentItemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TreatmentItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TreatmentItemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TreatmentItem(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.treatmentItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
