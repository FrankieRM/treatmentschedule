/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TreatmentItemService } from 'app/entities/treatment-item/treatment-item.service';
import { ITreatmentItem, TreatmentItem } from 'app/shared/model/treatment-item.model';

describe('Service Tests', () => {
    describe('TreatmentItem Service', () => {
        let injector: TestBed;
        let service: TreatmentItemService;
        let httpMock: HttpTestingController;
        let elemDefault: ITreatmentItem;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TreatmentItemService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new TreatmentItem(0, currentDate, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        initialServiceDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a TreatmentItem', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        initialServiceDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        initialServiceDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new TreatmentItem(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a TreatmentItem', async () => {
                const returnedFromService = Object.assign(
                    {
                        initialServiceDate: currentDate.format(DATE_TIME_FORMAT),
                        discount: 1,
                        total: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        initialServiceDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of TreatmentItem', async () => {
                const returnedFromService = Object.assign(
                    {
                        initialServiceDate: currentDate.format(DATE_TIME_FORMAT),
                        discount: 1,
                        total: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        initialServiceDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a TreatmentItem', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
