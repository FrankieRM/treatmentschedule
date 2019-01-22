/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TreatmentscheduleTestModule } from '../../../test.module';
import { ParameterDetailComponent } from 'app/entities/parameter/parameter-detail.component';
import { Parameter } from 'app/shared/model/parameter.model';

describe('Component Tests', () => {
    describe('Parameter Management Detail Component', () => {
        let comp: ParameterDetailComponent;
        let fixture: ComponentFixture<ParameterDetailComponent>;
        const route = ({ data: of({ parameter: new Parameter(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TreatmentscheduleTestModule],
                declarations: [ParameterDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParameterDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParameterDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parameter).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
