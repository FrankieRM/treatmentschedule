/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ItemComponentsPage, ItemDeleteDialog, ItemUpdatePage } from './item.page-object';

const expect = chai.expect;

describe('Item e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let itemUpdatePage: ItemUpdatePage;
    let itemComponentsPage: ItemComponentsPage;
    let itemDeleteDialog: ItemDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Items', async () => {
        await navBarPage.goToEntity('item');
        itemComponentsPage = new ItemComponentsPage();
        expect(await itemComponentsPage.getTitle()).to.eq('treatmentscheduleApp.item.home.title');
    });

    it('should load create Item page', async () => {
        await itemComponentsPage.clickOnCreateButton();
        itemUpdatePage = new ItemUpdatePage();
        expect(await itemUpdatePage.getPageTitle()).to.eq('treatmentscheduleApp.item.home.createOrEditLabel');
        await itemUpdatePage.cancel();
    });

    it('should create and save Items', async () => {
        const nbButtonsBeforeCreate = await itemComponentsPage.countDeleteButtons();

        await itemComponentsPage.clickOnCreateButton();
        await promise.all([
            itemUpdatePage.setDescriptionInput('description'),
            itemUpdatePage.setPriceInput('5'),
            itemUpdatePage.treatmentItemSelectLastOption()
        ]);
        expect(await itemUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await itemUpdatePage.getPriceInput()).to.eq('5');
        await itemUpdatePage.save();
        expect(await itemUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await itemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Item', async () => {
        const nbButtonsBeforeDelete = await itemComponentsPage.countDeleteButtons();
        await itemComponentsPage.clickOnLastDeleteButton();

        itemDeleteDialog = new ItemDeleteDialog();
        expect(await itemDeleteDialog.getDialogTitle()).to.eq('treatmentscheduleApp.item.delete.question');
        await itemDeleteDialog.clickOnConfirmButton();

        expect(await itemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
