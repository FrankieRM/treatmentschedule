/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PatientComponentsPage, PatientDeleteDialog, PatientUpdatePage } from './patient.page-object';

const expect = chai.expect;

describe('Patient e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let patientUpdatePage: PatientUpdatePage;
    let patientComponentsPage: PatientComponentsPage;
    let patientDeleteDialog: PatientDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Patients', async () => {
        await navBarPage.goToEntity('patient');
        patientComponentsPage = new PatientComponentsPage();
        expect(await patientComponentsPage.getTitle()).to.eq('treatmentscheduleApp.patient.home.title');
    });

    it('should load create Patient page', async () => {
        await patientComponentsPage.clickOnCreateButton();
        patientUpdatePage = new PatientUpdatePage();
        expect(await patientUpdatePage.getPageTitle()).to.eq('treatmentscheduleApp.patient.home.createOrEditLabel');
        await patientUpdatePage.cancel();
    });

    it('should create and save Patients', async () => {
        const nbButtonsBeforeCreate = await patientComponentsPage.countDeleteButtons();

        await patientComponentsPage.clickOnCreateButton();
        await promise.all([
            patientUpdatePage.setInternNumberInput('internNumber'),
            patientUpdatePage.setCommuneInput('commune'),
            patientUpdatePage.setOccupationInput('occupation'),
            patientUpdatePage.setEmployerInput('employer'),
            patientUpdatePage.setRepresentativeInput('representative'),
            patientUpdatePage.setReferenceInput('reference'),
            patientUpdatePage.setObservationsInput('observations'),
            patientUpdatePage.personSelectLastOption(),
            patientUpdatePage.sexSelectLastOption()
        ]);
        expect(await patientUpdatePage.getInternNumberInput()).to.eq('internNumber');
        expect(await patientUpdatePage.getCommuneInput()).to.eq('commune');
        expect(await patientUpdatePage.getOccupationInput()).to.eq('occupation');
        expect(await patientUpdatePage.getEmployerInput()).to.eq('employer');
        expect(await patientUpdatePage.getRepresentativeInput()).to.eq('representative');
        expect(await patientUpdatePage.getReferenceInput()).to.eq('reference');
        expect(await patientUpdatePage.getObservationsInput()).to.eq('observations');
        await patientUpdatePage.save();
        expect(await patientUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Patient', async () => {
        const nbButtonsBeforeDelete = await patientComponentsPage.countDeleteButtons();
        await patientComponentsPage.clickOnLastDeleteButton();

        patientDeleteDialog = new PatientDeleteDialog();
        expect(await patientDeleteDialog.getDialogTitle()).to.eq('treatmentscheduleApp.patient.delete.question');
        await patientDeleteDialog.clickOnConfirmButton();

        expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
