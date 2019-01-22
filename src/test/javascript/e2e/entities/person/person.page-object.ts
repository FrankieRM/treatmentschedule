import { element, by, ElementFinder } from 'protractor';

export class PersonComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-person div table .btn-danger'));
    title = element.all(by.css('jhi-person div h2#page-heading span')).first();

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

export class PersonUpdatePage {
    pageTitle = element(by.id('jhi-person-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    documentNumberInput = element(by.id('field_documentNumber'));
    genderInput = element(by.id('field_gender'));
    birthDayInput = element(by.id('field_birthDay'));
    yearsInput = element(by.id('field_years'));
    addressSelect = element(by.id('field_address'));
    documentTypeSelect = element(by.id('field_documentType'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setDocumentNumberInput(documentNumber) {
        await this.documentNumberInput.sendKeys(documentNumber);
    }

    async getDocumentNumberInput() {
        return this.documentNumberInput.getAttribute('value');
    }

    async setGenderInput(gender) {
        await this.genderInput.sendKeys(gender);
    }

    async getGenderInput() {
        return this.genderInput.getAttribute('value');
    }

    async setBirthDayInput(birthDay) {
        await this.birthDayInput.sendKeys(birthDay);
    }

    async getBirthDayInput() {
        return this.birthDayInput.getAttribute('value');
    }

    async setYearsInput(years) {
        await this.yearsInput.sendKeys(years);
    }

    async getYearsInput() {
        return this.yearsInput.getAttribute('value');
    }

    async addressSelectLastOption() {
        await this.addressSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async addressSelectOption(option) {
        await this.addressSelect.sendKeys(option);
    }

    getAddressSelect(): ElementFinder {
        return this.addressSelect;
    }

    async getAddressSelectedOption() {
        return this.addressSelect.element(by.css('option:checked')).getText();
    }

    async documentTypeSelectLastOption() {
        await this.documentTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async documentTypeSelectOption(option) {
        await this.documentTypeSelect.sendKeys(option);
    }

    getDocumentTypeSelect(): ElementFinder {
        return this.documentTypeSelect;
    }

    async getDocumentTypeSelectedOption() {
        return this.documentTypeSelect.element(by.css('option:checked')).getText();
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

export class PersonDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-person-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-person'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
