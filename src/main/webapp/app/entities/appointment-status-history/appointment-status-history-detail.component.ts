import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';

@Component({
    selector: 'jhi-appointment-status-history-detail',
    templateUrl: './appointment-status-history-detail.component.html'
})
export class AppointmentStatusHistoryDetailComponent implements OnInit {
    appointmentStatusHistory: IAppointmentStatusHistory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ appointmentStatusHistory }) => {
            this.appointmentStatusHistory = appointmentStatusHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
