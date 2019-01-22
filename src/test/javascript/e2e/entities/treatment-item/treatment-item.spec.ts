/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TreatmentItemComponentsPage, TreatmentItemDeleteDialog, TreatmentItemUpdatePage } from './treatment-item.page-object';

const expect = chai.expect;

describe('TreatmentItem e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let treatmentItemUpdatePage: TreatmentItemUpdatePage;
    let treatmentItemComponentsPage: TreatmentItemComponentsPage;
    let treatmentItemDeleteDialog: TreatmentItemDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TreatmentItems', async () => {
        await navBarPage.goToEntity('treatment-item');
        treatmentItemComponentsPage = new TreatmentItemComponentsPage();
        expect(await treatmentItemComponentsPage.getTitle()).to.eq('treatmentscheduleApp.treatmentItem.home.title');
    });

    it('should load create TreatmentItem page', async () => {
        await treatmentItemComponentsPage.clickOnCreateButton();
        treatmentItemUpdatePage = new TreatmentItemUpdatePage();
        expect(await treatmentItemUpdatePage.getPageTitle()).to.eq('treatmentscheduleApp.treatmentItem.home.createOrEditLabel');
        await treatmentItemUpdatePage.cancel();
    });

    it('should create and save TreatmentItems', async () => {
        const nbButtonsBeforeCreate = await treatmentItemComponentsPage.countDeleteButtons();

        await treatmentItemComponentsPage.clickOnCreateButton();
        await promise.all([
            treatmentItemUpdatePage.setInitialServiceDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            treatmentItemUpdatePage.setDiscountInput('5'),
            treatmentItemUpdatePage.setTotalInput('5'),
            treatmentItemUpdatePage.treatmentSelectLastOption(),
            treatmentItemUpdatePage.paymentStatusSelectLastOption()
        ]);
        expect(await treatmentItemUpdatePage.getInitialServiceDateInput()).to.contain('2001-01-01T02:30');
        expect(await treatmentItemUpdatePage.getDiscountInput()).to.eq('5');
        expect(await treatmentItemUpdatePage.getTotalInput()).to.eq('5');
        await treatmentItemUpdatePage.save();
        expect(await treatmentItemUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await treatmentItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TreatmentItem', async () => {
        const nbButtonsBeforeDelete = await treatmentItemComponentsPage.countDeleteButtons();
        await treatmentItemComponentsPage.clickOnLastDeleteButton();

        treatmentItemDeleteDialog = new TreatmentItemDeleteDialog();
        expect(await treatmentItemDeleteDialog.getDialogTitle()).to.eq('treatmentscheduleApp.treatmentItem.delete.question');
        await treatmentItemDeleteDialog.clickOnConfirmButton();

        expect(await treatmentItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
