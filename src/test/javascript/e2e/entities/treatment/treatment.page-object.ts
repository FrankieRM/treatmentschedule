import { element, by, ElementFinder } from 'protractor';

export class TreatmentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-treatment div table .btn-danger'));
    title = element.all(by.css('jhi-treatment div h2#page-heading span')).first();

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

export class TreatmentUpdatePage {
    pageTitle = element(by.id('jhi-treatment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    discountInput = element(by.id('field_discount'));
    warningsAboutPatientInput = element(by.id('field_warningsAboutPatient'));
    scheduleSelect = element(by.id('field_schedule'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDiscountInput(discount) {
        await this.discountInput.sendKeys(discount);
    }

    async getDiscountInput() {
        return this.discountInput.getAttribute('value');
    }

    async setWarningsAboutPatientInput(warningsAboutPatient) {
        await this.warningsAboutPatientInput.sendKeys(warningsAboutPatient);
    }

    async getWarningsAboutPatientInput() {
        return this.warningsAboutPatientInput.getAttribute('value');
    }

    async scheduleSelectLastOption() {
        await this.scheduleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async scheduleSelectOption(option) {
        await this.scheduleSelect.sendKeys(option);
    }

    getScheduleSelect(): ElementFinder {
        return this.scheduleSelect;
    }

    async getScheduleSelectedOption() {
        return this.scheduleSelect.element(by.css('option:checked')).getText();
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

export class TreatmentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-treatment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-treatment'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
