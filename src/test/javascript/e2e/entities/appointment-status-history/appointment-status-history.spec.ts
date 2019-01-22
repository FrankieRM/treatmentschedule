/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    AppointmentStatusHistoryComponentsPage,
    AppointmentStatusHistoryDeleteDialog,
    AppointmentStatusHistoryUpdatePage
} from './appointment-status-history.page-object';

const expect = chai.expect;

describe('AppointmentStatusHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let appointmentStatusHistoryUpdatePage: AppointmentStatusHistoryUpdatePage;
    let appointmentStatusHistoryComponentsPage: AppointmentStatusHistoryComponentsPage;
    let appointmentStatusHistoryDeleteDialog: AppointmentStatusHistoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AppointmentStatusHistories', async () => {
        await navBarPage.goToEntity('appointment-status-history');
        appointmentStatusHistoryComponentsPage = new AppointmentStatusHistoryComponentsPage();
        expect(await appointmentStatusHistoryComponentsPage.getTitle()).to.eq('treatmentscheduleApp.appointmentStatusHistory.home.title');
    });

    it('should load create AppointmentStatusHistory page', async () => {
        await appointmentStatusHistoryComponentsPage.clickOnCreateButton();
        appointmentStatusHistoryUpdatePage = new AppointmentStatusHistoryUpdatePage();
        expect(await appointmentStatusHistoryUpdatePage.getPageTitle()).to.eq(
            'treatmentscheduleApp.appointmentStatusHistory.home.createOrEditLabel'
        );
        await appointmentStatusHistoryUpdatePage.cancel();
    });

    it('should create and save AppointmentStatusHistories', async () => {
        const nbButtonsBeforeCreate = await appointmentStatusHistoryComponentsPage.countDeleteButtons();

        await appointmentStatusHistoryComponentsPage.clickOnCreateButton();
        await promise.all([
            appointmentStatusHistoryUpdatePage.setModifyDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            appointmentStatusHistoryUpdatePage.scheduleSelectLastOption(),
            appointmentStatusHistoryUpdatePage.appointmentStatusSelectLastOption()
        ]);
        expect(await appointmentStatusHistoryUpdatePage.getModifyDateInput()).to.contain('2001-01-01T02:30');
        await appointmentStatusHistoryUpdatePage.save();
        expect(await appointmentStatusHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await appointmentStatusHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AppointmentStatusHistory', async () => {
        const nbButtonsBeforeDelete = await appointmentStatusHistoryComponentsPage.countDeleteButtons();
        await appointmentStatusHistoryComponentsPage.clickOnLastDeleteButton();

        appointmentStatusHistoryDeleteDialog = new AppointmentStatusHistoryDeleteDialog();
        expect(await appointmentStatusHistoryDeleteDialog.getDialogTitle()).to.eq(
            'treatmentscheduleApp.appointmentStatusHistory.delete.question'
        );
        await appointmentStatusHistoryDeleteDialog.clickOnConfirmButton();

        expect(await appointmentStatusHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
