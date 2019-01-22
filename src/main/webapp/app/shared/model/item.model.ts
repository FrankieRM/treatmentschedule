import { ITreatmentItem } from 'app/shared/model//treatment-item.model';

export interface IItem {
    id?: number;
    description?: string;
    price?: number;
    treatmentItem?: ITreatmentItem;
}

export class Item implements IItem {
    constructor(public id?: number, public description?: string, public price?: number, public treatmentItem?: ITreatmentItem) {}
}
