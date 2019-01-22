import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParameter } from 'app/shared/model/parameter.model';

@Component({
    selector: 'jhi-parameter-detail',
    templateUrl: './parameter-detail.component.html'
})
export class ParameterDetailComponent implements OnInit {
    parameter: IParameter;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parameter }) => {
            this.parameter = parameter;
        });
    }

    previousState() {
        window.history.back();
    }
}
