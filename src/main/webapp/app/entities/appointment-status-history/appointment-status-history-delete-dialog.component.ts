import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppointmentStatusHistory } from 'app/shared/model/appointment-status-history.model';
import { AppointmentStatusHistoryService } from './appointment-status-history.service';

@Component({
    selector: 'jhi-appointment-status-history-delete-dialog',
    templateUrl: './appointment-status-history-delete-dialog.component.html'
})
export class AppointmentStatusHistoryDeleteDialogComponent {
    appointmentStatusHistory: IAppointmentStatusHistory;

    constructor(
        protected appointmentStatusHistoryService: AppointmentStatusHistoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.appointmentStatusHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'appointmentStatusHistoryListModification',
                content: 'Deleted an appointmentStatusHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-appointment-status-history-delete-popup',
    template: ''
})
export class AppointmentStatusHistoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ appointmentStatusHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AppointmentStatusHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.appointmentStatusHistory = appointmentStatusHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
