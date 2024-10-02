const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://akashpawar:akashpawar@cluster0.1cuo7.mongodb.net/test')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const screenshotModel = mongoose.model('Screenshot', {
    image: Buffer,
    fileName: String,
});

const cookiesFilePath = path.join(__dirname, 'cookies.json');

async function saveCookies(page) {
    const cookies = await page.cookies();
    fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies));
}

async function loadCookies(page) {
    if (fs.existsSync(cookiesFilePath)) {
        const cookies = JSON.parse(fs.readFileSync(cookiesFilePath));
        await page.setCookie(...cookies);
    }
}

async function takeScreenshot(page) {

    await page.goto('https://github.com/akashpawar07/work-manager',{fullPage :true}); // Navigate to the example.com webpage

    const screenshotBuffer = await page.screenshot({ fullPage: true });

    // Convert Uint8Array to Buffer
    const buffer = Buffer.from(screenshotBuffer);

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const screenshot = new screenshotModel({
        image: buffer,
        fileName: `Screenshot-${timestamp}.png`,
    });
    await screenshot.save();
    console.log('Screenshot saved to database!');
}

async function startTakingScreenshots() {
    const browser = await puppeteer.launch({ 
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    });
    const page = await browser.newPage();

    await loadCookies(page);

    await page.setExtraHTTPHeaders({
        'x-screenshot': 'true',
    });


    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds

    while (true) {
        await takeScreenshot(page);
        console.log('Screenshot taken!');
        await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000)); // Wait for 10 minutes
    }
}

startTakingScreenshots().catch(console.error);