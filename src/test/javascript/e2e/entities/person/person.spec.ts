/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PersonComponentsPage, PersonDeleteDialog, PersonUpdatePage } from './person.page-object';

const expect = chai.expect;

describe('Person e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let personUpdatePage: PersonUpdatePage;
    let personComponentsPage: PersonComponentsPage;
    let personDeleteDialog: PersonDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load People', async () => {
        await navBarPage.goToEntity('person');
        personComponentsPage = new PersonComponentsPage();
        expect(await personComponentsPage.getTitle()).to.eq('treatmentscheduleApp.person.home.title');
    });

    it('should load create Person page', async () => {
        await personComponentsPage.clickOnCreateButton();
        personUpdatePage = new PersonUpdatePage();
        expect(await personUpdatePage.getPageTitle()).to.eq('treatmentscheduleApp.person.home.createOrEditLabel');
        await personUpdatePage.cancel();
    });

    it('should create and save People', async () => {
        const nbButtonsBeforeCreate = await personComponentsPage.countDeleteButtons();

        await personComponentsPage.clickOnCreateButton();
        await promise.all([
            personUpdatePage.setFirstNameInput('firstName'),
            personUpdatePage.setLastNameInput('lastName'),
            personUpdatePage.setDocumentNumberInput('documentNumber'),
            personUpdatePage.setGenderInput('gender'),
            personUpdatePage.setBirthDayInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            personUpdatePage.setYearsInput('5'),
            personUpdatePage.addressSelectLastOption(),
            personUpdatePage.documentTypeSelectLastOption()
        ]);
        expect(await personUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await personUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await personUpdatePage.getDocumentNumberInput()).to.eq('documentNumber');
        expect(await personUpdatePage.getGenderInput()).to.eq('gender');
        expect(await personUpdatePage.getBirthDayInput()).to.contain('2001-01-01T02:30');
        expect(await personUpdatePage.getYearsInput()).to.eq('5');
        await personUpdatePage.save();
        expect(await personUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Person', async () => {
        const nbButtonsBeforeDelete = await personComponentsPage.countDeleteButtons();
        await personComponentsPage.clickOnLastDeleteButton();

        personDeleteDialog = new PersonDeleteDialog();
        expect(await personDeleteDialog.getDialogTitle()).to.eq('treatmentscheduleApp.person.delete.question');
        await personDeleteDialog.clickOnConfirmButton();

        expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
