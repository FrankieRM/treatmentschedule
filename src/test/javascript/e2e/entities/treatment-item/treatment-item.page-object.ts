import { element, by, ElementFinder } from 'protractor';

export class TreatmentItemComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-treatment-item div table .btn-danger'));
    title = element.all(by.css('jhi-treatment-item div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TreatmentItemUpdatePage {
    pageTitle = element(by.id('jhi-treatment-item-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    initialServiceDateInput = element(by.id('field_initialServiceDate'));
    discountInput = element(by.id('field_discount'));
    totalInput = element(by.id('field_total'));
    treatmentSelect = element(by.id('field_treatment'));
    paymentStatusSelect = element(by.id('field_paymentStatus'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setInitialServiceDateInput(initialServiceDate) {
        await this.initialServiceDateInput.sendKeys(initialServiceDate);
    }

    async getInitialServiceDateInput() {
        return this.initialServiceDateInput.getAttribute('value');
    }

    async setDiscountInput(discount) {
        await this.discountInput.sendKeys(discount);
    }

    async getDiscountInput() {
        return this.discountInput.getAttribute('value');
    }

    async setTotalInput(total) {
        await this.totalInput.sendKeys(total);
    }

    async getTotalInput() {
        return this.totalInput.getAttribute('value');
    }

    async treatmentSelectLastOption() {
        await this.treatmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async treatmentSelectOption(option) {
        await this.treatmentSelect.sendKeys(option);
    }

    getTreatmentSelect(): ElementFinder {
        return this.treatmentSelect;
    }

    async getTreatmentSelectedOption() {
        return this.treatmentSelect.element(by.css('option:checked')).getText();
    }

    async paymentStatusSelectLastOption() {
        await this.paymentStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async paymentStatusSelectOption(option) {
        await this.paymentStatusSelect.sendKeys(option);
    }

    getPaymentStatusSelect(): ElementFinder {
        return this.paymentStatusSelect;
    }

    async getPaymentStatusSelectedOption() {
        return this.paymentStatusSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class TreatmentItemDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-treatmentItem-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-treatmentItem'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
