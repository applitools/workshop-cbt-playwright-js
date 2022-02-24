const { test, expect } = require('@playwright/test');


test.describe.configure({ mode: 'parallel' })

test.describe('A traditional test', () => {

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({width: 1600, height: 1200});
    });

    test('should log into the demo app', async ({ page }) => {
        
        // Load login page
        let site = process.env.DEMO_SITE ?? 'original'
        let extra = (site == 'original') ? '' : '/index_v2.html'
        await page.goto('https://demo.applitools.com' + extra);

        // Verify login page
        await expect(page.locator('div.logo-w')).toBeVisible();
        await expect(page.locator('id=username')).toBeVisible();
        await expect(page.locator('id=password')).toBeVisible();
        await expect(page.locator('id=log-in')).toBeVisible();
        await expect(page.locator('input.form-check-input')).toBeVisible();
        
        // Perform login
        await page.fill('id=username', 'andy')
        await page.fill('id=password', 'i<3pandas')
        await page.click('id=log-in')

        // Verify main page

        //   Check various page elements
        await expect.soft(page.locator('div.logo-w')).toBeVisible();
        await expect.soft(page.locator('div.element-search.autosuggest-search-activator > input')).toBeVisible();
        await expect.soft(page.locator('ul.main-menu')).toBeVisible();
        await expect.soft(page.locator('div.avatar-w img')).toHaveCount(2);
        await expect.soft(page.locator('text=Add Account')).toBeVisible();
        await expect.soft(page.locator('text=Make Payment')).toBeVisible();
        await expect.soft(page.locator('text=View Statement')).toBeVisible();
        await expect.soft(page.locator('text=Request Increase')).toBeVisible();
        await expect.soft(page.locator('text=Pay Now')).toBeVisible();

        //    Check time message
        await expect.soft(page.locator('id=time')).toContainText(/Your nearest branch closes in:( \d+[hms])+/);

        //    Check menu element names
        await expect.soft(page.locator('ul.main-menu li span')).toHaveText(
            ['Card types', 'Credit cards', 'Debit cards', 'Lending', 'Loans', 'Mortgages']);

        //    Check transaction statuses
        let statuses = await page.locator('span.status-pill + span').allTextContents();
        statuses.forEach(item => {
            expect.soft(['Complete', 'Pending', 'Declined']).toContain(item);
        });
    });
})
