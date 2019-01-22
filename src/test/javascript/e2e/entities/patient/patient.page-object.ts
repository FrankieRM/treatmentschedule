import { element, by, ElementFinder } from 'protractor';

export class PatientComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-patient div table .btn-danger'));
    title = element.all(by.css('jhi-patient div h2#page-heading span')).first();

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

export class PatientUpdatePage {
    pageTitle = element(by.id('jhi-patient-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    internNumberInput = element(by.id('field_internNumber'));
    communeInput = element(by.id('field_commune'));
    occupationInput = element(by.id('field_occupation'));
    employerInput = element(by.id('field_employer'));
    representativeInput = element(by.id('field_representative'));
    referenceInput = element(by.id('field_reference'));
    observationsInput = element(by.id('field_observations'));
    personSelect = element(by.id('field_person'));
    sexSelect = element(by.id('field_sex'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setInternNumberInput(internNumber) {
        await this.internNumberInput.sendKeys(internNumber);
    }

    async getInternNumberInput() {
        return this.internNumberInput.getAttribute('value');
    }

    async setCommuneInput(commune) {
        await this.communeInput.sendKeys(commune);
    }

    async getCommuneInput() {
        return this.communeInput.getAttribute('value');
    }

    async setOccupationInput(occupation) {
        await this.occupationInput.sendKeys(occupation);
    }

    async getOccupationInput() {
        return this.occupationInput.getAttribute('value');
    }

    async setEmployerInput(employer) {
        await this.employerInput.sendKeys(employer);
    }

    async getEmployerInput() {
        return this.employerInput.getAttribute('value');
    }

    async setRepresentativeInput(representative) {
        await this.representativeInput.sendKeys(representative);
    }

    async getRepresentativeInput() {
        return this.representativeInput.getAttribute('value');
    }

    async setReferenceInput(reference) {
        await this.referenceInput.sendKeys(reference);
    }

    async getReferenceInput() {
        return this.referenceInput.getAttribute('value');
    }

    async setObservationsInput(observations) {
        await this.observationsInput.sendKeys(observations);
    }

    async getObservationsInput() {
        return this.observationsInput.getAttribute('value');
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

    async sexSelectLastOption() {
        await this.sexSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sexSelectOption(option) {
        await this.sexSelect.sendKeys(option);
    }

    getSexSelect(): ElementFinder {
        return this.sexSelect;
    }

    async getSexSelectedOption() {
        return this.sexSelect.element(by.css('option:checked')).getText();
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

export class PatientDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-patient-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-patient'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
