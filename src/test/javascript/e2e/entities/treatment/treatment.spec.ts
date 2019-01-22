/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TreatmentComponentsPage, TreatmentDeleteDialog, TreatmentUpdatePage } from './treatment.page-object';

const expect = chai.expect;

describe('Treatment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let treatmentUpdatePage: TreatmentUpdatePage;
    let treatmentComponentsPage: TreatmentComponentsPage;
    let treatmentDeleteDialog: TreatmentDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Treatments', async () => {
        await navBarPage.goToEntity('treatment');
        treatmentComponentsPage = new TreatmentComponentsPage();
        expect(await treatmentComponentsPage.getTitle()).to.eq('treatmentscheduleApp.treatment.home.title');
    });

    it('should load create Treatment page', async () => {
        await treatmentComponentsPage.clickOnCreateButton();
        treatmentUpdatePage = new TreatmentUpdatePage();
        expect(await treatmentUpdatePage.getPageTitle()).to.eq('treatmentscheduleApp.treatment.home.createOrEditLabel');
        await treatmentUpdatePage.cancel();
    });

    it('should create and save Treatments', async () => {
        const nbButtonsBeforeCreate = await treatmentComponentsPage.countDeleteButtons();

        await treatmentComponentsPage.clickOnCreateButton();
        await promise.all([
            treatmentUpdatePage.setDiscountInput('5'),
            treatmentUpdatePage.setWarningsAboutPatientInput('warningsAboutPatient'),
            treatmentUpdatePage.scheduleSelectLastOption()
        ]);
        expect(await treatmentUpdatePage.getDiscountInput()).to.eq('5');
        expect(await treatmentUpdatePage.getWarningsAboutPatientInput()).to.eq('warningsAboutPatient');
        await treatmentUpdatePage.save();
        expect(await treatmentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await treatmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Treatment', async () => {
        const nbButtonsBeforeDelete = await treatmentComponentsPage.countDeleteButtons();
        await treatmentComponentsPage.clickOnLastDeleteButton();

        treatmentDeleteDialog = new TreatmentDeleteDialog();
        expect(await treatmentDeleteDialog.getDialogTitle()).to.eq('treatmentscheduleApp.treatment.delete.question');
        await treatmentDeleteDialog.clickOnConfirmButton();

        expect(await treatmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
