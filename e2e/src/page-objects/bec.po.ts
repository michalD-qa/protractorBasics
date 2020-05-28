import { $, $$, browser } from 'protractor';
import { waitForVisibility } from 'protractor-utils/elementsInteractions/waitFunctions';

export class BECPage {
  private URL = 'https://www.bec.dk';
  private URL_about = 'https://www.bec.dk/en/about-bec/';
  private mainPage = $('#home');
  private headerNavbar = $('.header-navbar');

  async goTo() {
    await browser.get(this.URL);
  }

  async goToAboutPage() {
    await browser.get(this.URL_about);
  }

  async waitToBeOn() {
    await waitForVisibility(this.mainPage);
  }

  async verifyIsOnHomePage() {
    this.waitToBeOn();
  }

  async verifyIsOnAboutPage() {
    await waitForVisibility(this.headerNavbar);
  }
}
