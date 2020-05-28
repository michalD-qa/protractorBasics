import { GooglePage } from '../page-objects/google.po';
import { BECPage } from '../page-objects/bec.po';

describe('Google page', async () => {
  const googlePage: GooglePage = new GooglePage();

  it('When search for some text then list of found element is displayed', async () => {
    await googlePage.goTo();
    await googlePage.searchFor('My Searching string');
    await googlePage.verifySearchResultsAreAvailable();
  });
});

describe('BEC page', async () => {
  const becPage: BECPage = new BECPage();

  it('When go on home page then proper page is visible', async () => {
    await becPage.goTo();
    await becPage.verifyIsOnHomePage();
  });
  it('When go on "about-bec" page then proper site is opened', async () => {
    await becPage.goToAboutPage();
    await becPage.verifyIsOnAboutPage();
  });
});
