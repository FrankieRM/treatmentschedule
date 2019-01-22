import { element, by, ElementFinder } from 'protractor';

export class AppointmentStatusHistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-appointment-status-history div table .btn-danger'));
    title = element.all(by.css('jhi-appointment-status-history div h2#page-heading span')).first();

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

export class AppointmentStatusHistoryUpdatePage {
    pageTitle = element(by.id('jhi-appointment-status-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    modifyDateInput = element(by.id('field_modifyDate'));
    scheduleSelect = element(by.id('field_schedule'));
    appointmentStatusSelect = element(by.id('field_appointmentStatus'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setModifyDateInput(modifyDate) {
        await this.modifyDateInput.sendKeys(modifyDate);
    }

    async getModifyDateInput() {
        return this.modifyDateInput.getAttribute('value');
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

    async appointmentStatusSelectLastOption() {
        await this.appointmentStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async appointmentStatusSelectOption(option) {
        await this.appointmentStatusSelect.sendKeys(option);
    }

    getAppointmentStatusSelect(): ElementFinder {
        return this.appointmentStatusSelect;
    }

    async getAppointmentStatusSelectedOption() {
        return this.appointmentStatusSelect.element(by.css('option:checked')).getText();
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

export class AppointmentStatusHistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-appointmentStatusHistory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-appointmentStatusHistory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
