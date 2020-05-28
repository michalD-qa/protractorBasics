import { $, $$, browser } from 'protractor';
import { sendKeysToActiveElement } from '@protractor/elementsInteractions/sendKeysFunctions';
import { clickElement } from '@protractor/elementsInteractions/clickFunctions';
import { waitForVisibility } from '@protractor/elementsInteractions/waitFunctions';


export class GooglePage {
  private URL = 'http://www.google.pl';
  private searchBtn = $$('input[name="btnK"]').get(1);
  private searchResults = $('.mw #rcnt');

  async goTo() {
    await browser.get(this.URL);
  }

  async searchFor(searchString: string) {
    await sendKeysToActiveElement(searchString);
    await clickElement(this.searchBtn);
  }

  async verifySearchResultsAreAvailable() {
    await waitForVisibility(this.searchResults);
  }
}
