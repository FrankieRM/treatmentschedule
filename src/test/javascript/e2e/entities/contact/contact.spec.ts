/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContactComponentsPage, ContactDeleteDialog, ContactUpdatePage } from './contact.page-object';

const expect = chai.expect;

describe('Contact e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let contactUpdatePage: ContactUpdatePage;
    let contactComponentsPage: ContactComponentsPage;
    let contactDeleteDialog: ContactDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Contacts', async () => {
        await navBarPage.goToEntity('contact');
        contactComponentsPage = new ContactComponentsPage();
        expect(await contactComponentsPage.getTitle()).to.eq('treatmentscheduleApp.contact.home.title');
    });

    it('should load create Contact page', async () => {
        await contactComponentsPage.clickOnCreateButton();
        contactUpdatePage = new ContactUpdatePage();
        expect(await contactUpdatePage.getPageTitle()).to.eq('treatmentscheduleApp.contact.home.createOrEditLabel');
        await contactUpdatePage.cancel();
    });

    it('should create and save Contacts', async () => {
        const nbButtonsBeforeCreate = await contactComponentsPage.countDeleteButtons();

        await contactComponentsPage.clickOnCreateButton();
        await promise.all([
            contactUpdatePage.setValueInput('value'),
            contactUpdatePage.personSelectLastOption(),
            contactUpdatePage.contactTypeSelectLastOption()
        ]);
        expect(await contactUpdatePage.getValueInput()).to.eq('value');
        await contactUpdatePage.save();
        expect(await contactUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await contactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Contact', async () => {
        const nbButtonsBeforeDelete = await contactComponentsPage.countDeleteButtons();
        await contactComponentsPage.clickOnLastDeleteButton();

        contactDeleteDialog = new ContactDeleteDialog();
        expect(await contactDeleteDialog.getDialogTitle()).to.eq('treatmentscheduleApp.contact.delete.question');
        await contactDeleteDialog.clickOnConfirmButton();

        expect(await contactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
