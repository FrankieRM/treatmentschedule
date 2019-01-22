/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParameterComponentsPage, ParameterDeleteDialog, ParameterUpdatePage } from './parameter.page-object';

const expect = chai.expect;

describe('Parameter e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let parameterUpdatePage: ParameterUpdatePage;
    let parameterComponentsPage: ParameterComponentsPage;
    let parameterDeleteDialog: ParameterDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Parameters', async () => {
        await navBarPage.goToEntity('parameter');
        parameterComponentsPage = new ParameterComponentsPage();
        expect(await parameterComponentsPage.getTitle()).to.eq('treatmentscheduleApp.parameter.home.title');
    });

    it('should load create Parameter page', async () => {
        await parameterComponentsPage.clickOnCreateButton();
        parameterUpdatePage = new ParameterUpdatePage();
        expect(await parameterUpdatePage.getPageTitle()).to.eq('treatmentscheduleApp.parameter.home.createOrEditLabel');
        await parameterUpdatePage.cancel();
    });

    it('should create and save Parameters', async () => {
        const nbButtonsBeforeCreate = await parameterComponentsPage.countDeleteButtons();

        await parameterComponentsPage.clickOnCreateButton();
        await promise.all([parameterUpdatePage.setValueInput('value'), parameterUpdatePage.parentSelectLastOption()]);
        expect(await parameterUpdatePage.getValueInput()).to.eq('value');
        const selectedStatus = parameterUpdatePage.getStatusInput();
        if (await selectedStatus.isSelected()) {
            await parameterUpdatePage.getStatusInput().click();
            expect(await parameterUpdatePage.getStatusInput().isSelected()).to.be.false;
        } else {
            await parameterUpdatePage.getStatusInput().click();
            expect(await parameterUpdatePage.getStatusInput().isSelected()).to.be.true;
        }
        await parameterUpdatePage.save();
        expect(await parameterUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await parameterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Parameter', async () => {
        const nbButtonsBeforeDelete = await parameterComponentsPage.countDeleteButtons();
        await parameterComponentsPage.clickOnLastDeleteButton();

        parameterDeleteDialog = new ParameterDeleteDialog();
        expect(await parameterDeleteDialog.getDialogTitle()).to.eq('treatmentscheduleApp.parameter.delete.question');
        await parameterDeleteDialog.clickOnConfirmButton();

        expect(await parameterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
