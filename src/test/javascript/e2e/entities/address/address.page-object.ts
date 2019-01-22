import { element, by, ElementFinder } from 'protractor';

export class AddressComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-address div table .btn-danger'));
    title = element.all(by.css('jhi-address div h2#page-heading span')).first();

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

export class AddressUpdatePage {
    pageTitle = element(by.id('jhi-address-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionAddressInput = element(by.id('field_descriptionAddress'));
    referencesInput = element(by.id('field_references'));
    addressTypeSelect = element(by.id('field_addressType'));
    countrySelect = element(by.id('field_country'));
    departmentSelect = element(by.id('field_department'));
    provinceSelect = element(by.id('field_province'));
    districtSelect = element(by.id('field_district'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDescriptionAddressInput(descriptionAddress) {
        await this.descriptionAddressInput.sendKeys(descriptionAddress);
    }

    async getDescriptionAddressInput() {
        return this.descriptionAddressInput.getAttribute('value');
    }

    async setReferencesInput(references) {
        await this.referencesInput.sendKeys(references);
    }

    async getReferencesInput() {
        return this.referencesInput.getAttribute('value');
    }

    async addressTypeSelectLastOption() {
        await this.addressTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async addressTypeSelectOption(option) {
        await this.addressTypeSelect.sendKeys(option);
    }

    getAddressTypeSelect(): ElementFinder {
        return this.addressTypeSelect;
    }

    async getAddressTypeSelectedOption() {
        return this.addressTypeSelect.element(by.css('option:checked')).getText();
    }

    async countrySelectLastOption() {
        await this.countrySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async countrySelectOption(option) {
        await this.countrySelect.sendKeys(option);
    }

    getCountrySelect(): ElementFinder {
        return this.countrySelect;
    }

    async getCountrySelectedOption() {
        return this.countrySelect.element(by.css('option:checked')).getText();
    }

    async departmentSelectLastOption() {
        await this.departmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async departmentSelectOption(option) {
        await this.departmentSelect.sendKeys(option);
    }

    getDepartmentSelect(): ElementFinder {
        return this.departmentSelect;
    }

    async getDepartmentSelectedOption() {
        return this.departmentSelect.element(by.css('option:checked')).getText();
    }

    async provinceSelectLastOption() {
        await this.provinceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async provinceSelectOption(option) {
        await this.provinceSelect.sendKeys(option);
    }

    getProvinceSelect(): ElementFinder {
        return this.provinceSelect;
    }

    async getProvinceSelectedOption() {
        return this.provinceSelect.element(by.css('option:checked')).getText();
    }

    async districtSelectLastOption() {
        await this.districtSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async districtSelectOption(option) {
        await this.districtSelect.sendKeys(option);
    }

    getDistrictSelect(): ElementFinder {
        return this.districtSelect;
    }

    async getDistrictSelectedOption() {
        return this.districtSelect.element(by.css('option:checked')).getText();
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

export class AddressDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-address-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-address'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
