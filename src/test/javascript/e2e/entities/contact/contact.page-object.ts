import { element, by, ElementFinder } from 'protractor';

export class ContactComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-contact div table .btn-danger'));
    title = element.all(by.css('jhi-contact div h2#page-heading span')).first();

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

export class ContactUpdatePage {
    pageTitle = element(by.id('jhi-contact-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    valueInput = element(by.id('field_value'));
    personSelect = element(by.id('field_person'));
    contactTypeSelect = element(by.id('field_contactType'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setValueInput(value) {
        await this.valueInput.sendKeys(value);
    }

    async getValueInput() {
        return this.valueInput.getAttribute('value');
    }

    async personSelectLastOption() {
        await this.personSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async personSelectOption(option) {
        await this.personSelect.sendKeys(option);
    }

    getPersonSelect(): ElementFinder {
        return this.personSelect;
    }

    async getPersonSelectedOption() {
        return this.personSelect.element(by.css('option:checked')).getText();
    }

    async contactTypeSelectLastOption() {
        await this.contactTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async contactTypeSelectOption(option) {
        await this.contactTypeSelect.sendKeys(option);
    }

    getContactTypeSelect(): ElementFinder {
        return this.contactTypeSelect;
    }

    async getContactTypeSelectedOption() {
        return this.contactTypeSelect.element(by.css('option:checked')).getText();
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

export class ContactDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-contact-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-contact'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
