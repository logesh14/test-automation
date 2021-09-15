const { remote } = require('webdriverio');
import {  expect } from 'chai';
import * as request from 'https'
import { WEBIO_HOME_PAGE_URL } from '../url';

(async () => {

    describe('page ping test', () => {

    it('Home page url should return response code 200', () => {

        request.get(WEBIO_HOME_PAGE_URL, (res: any) => {
            expect(res.statusCode).to.equal(200);

        });
    });

    });


    describe('webdriver tests', async () => {


        it('Should pass navigation', async () => {

            const browser = await remote({
                capabilities: {
                    browserName: 'chrome'
                }
            })    

            await browser.url(WEBIO_HOME_PAGE_URL)

            // run through all elements of nav-bar.
            for(let i=3 ; i< 8;i++){
   
                let link: any = await browser.$('#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child('+i+')')
            
                // take screen shot for reference
                await browser.saveScreenshot('./screenshot/nav-bar'+(i-3)+'.png')
                await link.click();
                
            }
            

            // Navigate to blog element.
            let element_link: any = await browser.$('#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(5)')
            await element_link.click();
            
            element_link = await browser.$('#__docusaurus > div.main-wrapper.blog-wrapper.blog-list-page > div > div > div > div > ul > li:nth-child(1) > a')
            await element_link.click();
            
            //run throgh all sub menu's of blog.
            for(let i=1 ; i< 6;i++){
                                            
                let link: any = await browser.$('#__docusaurus > div.main-wrapper.blog-wrapper.blog-post-page > div > div > div.col.col--3 > div > ul > li:nth-child('+i+') > a')
                // take screen shot for reference
                await browser.saveScreenshot('./screenshot/blog-link'+(i-1)+'.png')
                await link.click();                
            }

            // delete session
            await browser.deleteSession()

        });
    });

})()

