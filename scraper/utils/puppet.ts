import puppeteer from 'puppeteer';
import { snooze } from '@au5ton/snooze';
import { ConfigCourse, ConfigRoot } from './config';
import { info, error, success } from './prettyPrint';
import AvailableSection from '../models/AvailableSection';

/* 
    code adapted from @cougargrades/peoplesoft
    https://github.com/cougargrades/peoplesoft/blob/master/src/util/puppet.ts
    
*/

export async function scrape(course: ConfigCourse): Promise<AvailableSection[]> {
    info('Opening browser')
    const browser = await puppeteer.launch({
        args: [
            '--headless', 
            '--no-sandbox',
            '--disable-gpu',
            '--window-size=1920,1080',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
        ]
    });

    info(`Started ${await browser.version()}`);
    const page = await browser.newPage()

    info('Navigating to https://courses.osu.edu/psp/csosuct/EMPLOYEE/PUB/c/COMMUNITY_ACCESS.OSR_CAT_SRCH.GBL?')
    await page.goto('https://courses.osu.edu/psp/csosuct/EMPLOYEE/PUB/c/COMMUNITY_ACCESS.OSR_CAT_SRCH.GBL?')

    info('Clicking')

    // inner peoplesoft iframe
    await page.waitFor('#ptifrmtgtframe');
    const frame = await page.frames().find(frame => frame.name() === 'TargetContent')!;

    // "Search"
    info ('Filling form')

    // select the appropriate semester
    await frame.waitForSelector('#CLASS_SRCH_WRK2_STRM\$35\$')
    await frame.select('#CLASS_SRCH_WRK2_STRM\\$35\\$', course.SemesterCode)
    await snooze(2000)

    // select the appropriate subject
    await frame.waitForSelector('#SSR_CLSRCH_WRK_SUBJECT_SRCH\$1')
    await frame.select('#SSR_CLSRCH_WRK_SUBJECT_SRCH\\$1', course.Subject)

    // uncheck "open only"
    await frame.waitForSelector('#SSR_CLSRCH_WRK_SSR_OPEN_ONLY\\$4');
    await frame.click('#SSR_CLSRCH_WRK_SSR_OPEN_ONLY\\$4')

    // type in the catalog number
    await frame.waitForSelector('#SSR_CLSRCH_WRK_CATALOG_NBR\\$2');
    await frame.focus('#SSR_CLSRCH_WRK_CATALOG_NBR\\$2')
    await page.keyboard.type(course.CatalogNumber)

    info('Submitting form')
    // click the submit button, which will fail if done too quickly
    await frame.waitForSelector('td > #win0divCLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH #CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH')
    await snooze(2000)
    await frame.click('td > #win0divCLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH #CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH')

    info('Loading results')
    await frame.waitForSelector('#ACE_DERIVED_CLSRCH_GROUP6')

    info('Scraping DOM')

    console.log(await page.screenshot({ encoding: 'base64'}));
    let data = await frame.evaluate(() => {
        function getRowElements() {
            let template = (x: any) => `trSSR_CLSRCH_MTG1$${x}_row1`;
            let results = [];
            for (let i = 0; true; i++) {
                let e = document.getElementById(template(i));
                if (e === null) break;
                results.push(e); 
            }
            return results;

            /* 
                SAMPLE: 
            
            */
        }

        function getRowData(row: HTMLElement) {
            let columns = Array.from(row.children);
            return columns.map((e, i) => i !== 10 ? e.textContent?.trim() : e?.querySelector('img')?.getAttribute('alt'))
        }

        return Promise.resolve(Array.from(getRowElements()).map(row => getRowData(row)));
    })

    info('Closing browser');
    await browser.close()

    return data.map(e => new AvailableSection(course.Subject, course.CatalogNumber, e.map(e => (e === null || e === undefined) ? "" : e)));

}