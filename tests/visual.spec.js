const { test } = require('@playwright/test');
const {
    VisualGridRunner,
    Eyes,
    Configuration,
    BatchInfo,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Target,
    MatchLevel
} = require('@applitools/eyes-playwright');


test.describe.configure({ mode: 'parallel' })

test.describe('A visual test', () => {
    let eyes, runner;

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({width: 1600, height: 1200});

        runner = new VisualGridRunner({ testConcurrency: 5 });
        eyes = new Eyes(runner);
    
        const configuration = new Configuration();
        configuration.setBatch(new BatchInfo('Modern Cross Browser Testing in JavaScript with Playwright'));
    
        configuration.addBrowser(800, 600, BrowserType.CHROME);
        configuration.addBrowser(700, 500, BrowserType.FIREFOX);
        configuration.addBrowser(1600, 1200, BrowserType.IE_11);
        configuration.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
        configuration.addBrowser(800, 600, BrowserType.SAFARI);
    
        configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
        configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
        configuration.addDeviceEmulation(DeviceName.Galaxy_S5, ScreenOrientation.PORTRAIT);
        configuration.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.PORTRAIT);
        configuration.addDeviceEmulation(DeviceName.iPad_Pro, ScreenOrientation.LANDSCAPE);
    
        eyes.setConfiguration(configuration);
    });

    test('should log into the demo app', async ({ page }) => {
        
        // Open Applitools Eyes
        await eyes.open(page, 'Applitools Demo App', 'Login');

        // Load login page
        let site = process.env.DEMO_SITE ?? 'original'
        let extra = (site == 'original') ? '' : '/index_v2.html'
        await page.goto('https://demo.applitools.com' + extra);

        // Verify login page
        await eyes.check('Login page', Target.window().fully());
        
        // Perform login
        await page.fill('id=username', 'andy')
        await page.fill('id=password', 'i<3pandas')
        await page.click('id=log-in')

        // Verify main page
        await eyes.check('Main page', Target.window().matchLevel(MatchLevel.Layout).fully());

        // Close Applitools Eyes
        await eyes.close(false)
    });

    test.afterEach(async () => {
        await eyes.abort();

        const results = await runner.getAllTestResults(false);
        console.log('Visual test results', results);
    });
})
