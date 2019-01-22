import { element, by, ElementFinder } from 'protractor';

export class EmployeeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employee div table .btn-danger'));
    title = element.all(by.css('jhi-employee div h2#page-heading span')).first();

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

export class EmployeeUpdatePage {
    pageTitle = element(by.id('jhi-employee-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    positionInput = element(by.id('field_position'));
    degreeInput = element(by.id('field_degree'));
    personSelect = element(by.id('field_person'));
    userSelect = element(by.id('field_user'));
    workPlaceAddressSelect = element(by.id('field_workPlaceAddress'));
    specialtySelect = element(by.id('field_specialty'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPositionInput(position) {
        await this.positionInput.sendKeys(position);
    }

    async getPositionInput() {
        return this.positionInput.getAttribute('value');
    }

    async setDegreeInput(degree) {
        await this.degreeInput.sendKeys(degree);
    }

    async getDegreeInput() {
        return this.degreeInput.getAttribute('value');
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

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    async workPlaceAddressSelectLastOption() {
        await this.workPlaceAddressSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async workPlaceAddressSelectOption(option) {
        await this.workPlaceAddressSelect.sendKeys(option);
    }

    getWorkPlaceAddressSelect(): ElementFinder {
        return this.workPlaceAddressSelect;
    }

    async getWorkPlaceAddressSelectedOption() {
        return this.workPlaceAddressSelect.element(by.css('option:checked')).getText();
    }

    async specialtySelectLastOption() {
        await this.specialtySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async specialtySelectOption(option) {
        await this.specialtySelect.sendKeys(option);
    }

    getSpecialtySelect(): ElementFinder {
        return this.specialtySelect;
    }

    async getSpecialtySelectedOption() {
        return this.specialtySelect.element(by.css('option:checked')).getText();
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

export class EmployeeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employee-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employee'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
