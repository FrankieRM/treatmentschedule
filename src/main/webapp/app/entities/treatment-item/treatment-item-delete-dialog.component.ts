import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITreatmentItem } from 'app/shared/model/treatment-item.model';
import { TreatmentItemService } from './treatment-item.service';

@Component({
    selector: 'jhi-treatment-item-delete-dialog',
    templateUrl: './treatment-item-delete-dialog.component.html'
})
export class TreatmentItemDeleteDialogComponent {
    treatmentItem: ITreatmentItem;

    constructor(
        protected treatmentItemService: TreatmentItemService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.treatmentItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'treatmentItemListModification',
                content: 'Deleted an treatmentItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-treatment-item-delete-popup',
    template: ''
})
export class TreatmentItemDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ treatmentItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TreatmentItemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.treatmentItem = treatmentItem;
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
