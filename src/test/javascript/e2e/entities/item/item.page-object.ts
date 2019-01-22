import { element, by, ElementFinder } from 'protractor';

export class ItemComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-item div table .btn-danger'));
    title = element.all(by.css('jhi-item div h2#page-heading span')).first();

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

export class ItemUpdatePage {
    pageTitle = element(by.id('jhi-item-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    priceInput = element(by.id('field_price'));
    treatmentItemSelect = element(by.id('field_treatmentItem'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async treatmentItemSelectLastOption() {
        await this.treatmentItemSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async treatmentItemSelectOption(option) {
        await this.treatmentItemSelect.sendKeys(option);
    }

    getTreatmentItemSelect(): ElementFinder {
        return this.treatmentItemSelect;
    }

    async getTreatmentItemSelectedOption() {
        return this.treatmentItemSelect.element(by.css('option:checked')).getText();
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

export class ItemDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-item-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-item'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
