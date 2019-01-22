/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { TreatmentItemDetailComponent } from 'app/entities/treatment-item/treatment-item-detail.component';
import { TreatmentItem } from 'app/shared/model/treatment-item.model';

describe('Component Tests', () => {
    describe('TreatmentItem Management Detail Component', () => {
        let comp: TreatmentItemDetailComponent;
        let fixture: ComponentFixture<TreatmentItemDetailComponent>;
        const route = ({ data: of({ treatmentItem: new TreatmentItem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [TreatmentItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TreatmentItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TreatmentItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.treatmentItem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
