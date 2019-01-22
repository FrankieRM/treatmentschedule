import { element, by, ElementFinder } from 'protractor';

export class ParameterComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-parameter div table .btn-danger'));
    title = element.all(by.css('jhi-parameter div h2#page-heading span')).first();

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

export class ParameterUpdatePage {
    pageTitle = element(by.id('jhi-parameter-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    valueInput = element(by.id('field_value'));
    statusInput = element(by.id('field_status'));
    parentSelect = element(by.id('field_parent'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setValueInput(value) {
        await this.valueInput.sendKeys(value);
    }

    async getValueInput() {
        return this.valueInput.getAttribute('value');
    }

    getStatusInput() {
        return this.statusInput;
    }

    async parentSelectLastOption() {
        await this.parentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async parentSelectOption(option) {
        await this.parentSelect.sendKeys(option);
    }

    getParentSelect(): ElementFinder {
        return this.parentSelect;
    }

    async getParentSelectedOption() {
        return this.parentSelect.element(by.css('option:checked')).getText();
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

export class ParameterDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-parameter-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-parameter'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
