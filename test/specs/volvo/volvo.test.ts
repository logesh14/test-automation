const { remote } = require('webdriverio');
import {  expect } from 'chai';
import * as request from 'https'

(async () => {

    const HOME_PAGE_URL = "https://www.volvocars.com/intl/v/car-safety/a-million-more"

    describe('page ping test', () => {

    it('Home page url should return response code 200', () => {

        request.get(HOME_PAGE_URL, (res: any) => {
            expect(res.statusCode).to.equal(200);

        });
    });

    });


    describe('Volvo Tests', () => {

        it('Should pass basic cookie popup', async () => {

            const browser = await remote({
                capabilities: {
                    browserName: 'chrome'
                }
            })

            await browser.url(HOME_PAGE_URL)

            
            let cookies_setting: any = await browser.$('/html/body/div[1]/div[2]/div[4]/div[3]/div/button')
            
            // take screen shot for reference
            await browser.saveScreenshot('./screenshot/pop-up-settings.png')
            await cookies_setting.click();


            let anchor_learnmore: any = await browser.$('//*[@id="optanon-menu"]/li[2]')
            await anchor_learnmore.click();

            anchor_learnmore = await browser.$('//*[@id="optanon-menu"]/li[3]')
            await anchor_learnmore.click();

            anchor_learnmore = await browser.$('//*[@id="optanon-menu"]/li[4]')
            await anchor_learnmore.click();

            anchor_learnmore = await browser.$('//*[@id="optanon-menu"]/li[5]')
            await anchor_learnmore.click();

            // take screen shot for reference
            await browser.saveScreenshot('./screenshot/pop-up-acceptall.png')

            let accept_policies: any = await browser.$('//*[@id="optanon-popup-bottom"]/div[2]/div[2]/button')
       
            await accept_policies.click();

            await browser.deleteSession()

        });
    });

})()

