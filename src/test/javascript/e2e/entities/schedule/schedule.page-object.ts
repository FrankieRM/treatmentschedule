import { element, by, ElementFinder } from 'protractor';

export class ScheduleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-schedule div table .btn-danger'));
    title = element.all(by.css('jhi-schedule div h2#page-heading span')).first();

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

export class ScheduleUpdatePage {
    pageTitle = element(by.id('jhi-schedule-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    initialAppointmentDateInput = element(by.id('field_initialAppointmentDate'));
    finalAppointmentDateInput = element(by.id('field_finalAppointmentDate'));
    durationInput = element(by.id('field_duration'));
    employeeSelect = element(by.id('field_employee'));
    patientSelect = element(by.id('field_patient'));
    situationSelect = element(by.id('field_situation'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setInitialAppointmentDateInput(initialAppointmentDate) {
        await this.initialAppointmentDateInput.sendKeys(initialAppointmentDate);
    }

    async getInitialAppointmentDateInput() {
        return this.initialAppointmentDateInput.getAttribute('value');
    }

    async setFinalAppointmentDateInput(finalAppointmentDate) {
        await this.finalAppointmentDateInput.sendKeys(finalAppointmentDate);
    }

    async getFinalAppointmentDateInput() {
        return this.finalAppointmentDateInput.getAttribute('value');
    }

    async setDurationInput(duration) {
        await this.durationInput.sendKeys(duration);
    }

    async getDurationInput() {
        return this.durationInput.getAttribute('value');
    }

    async employeeSelectLastOption() {
        await this.employeeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeeSelectOption(option) {
        await this.employeeSelect.sendKeys(option);
    }

    getEmployeeSelect(): ElementFinder {
        return this.employeeSelect;
    }

    async getEmployeeSelectedOption() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
    }

    async patientSelectLastOption() {
        await this.patientSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async patientSelectOption(option) {
        await this.patientSelect.sendKeys(option);
    }

    getPatientSelect(): ElementFinder {
        return this.patientSelect;
    }

    async getPatientSelectedOption() {
        return this.patientSelect.element(by.css('option:checked')).getText();
    }

    async situationSelectLastOption() {
        await this.situationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async situationSelectOption(option) {
        await this.situationSelect.sendKeys(option);
    }

    getSituationSelect(): ElementFinder {
        return this.situationSelect;
    }

    async getSituationSelectedOption() {
        return this.situationSelect.element(by.css('option:checked')).getText();
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

export class ScheduleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-schedule-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-schedule'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
