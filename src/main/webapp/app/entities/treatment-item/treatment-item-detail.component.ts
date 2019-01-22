import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITreatmentItem } from 'app/shared/model/treatment-item.model';

@Component({
    selector: 'jhi-treatment-item-detail',
    templateUrl: './treatment-item-detail.component.html'
})
export class TreatmentItemDetailComponent implements OnInit {
    treatmentItem: ITreatmentItem;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ treatmentItem }) => {
            this.treatmentItem = treatmentItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
