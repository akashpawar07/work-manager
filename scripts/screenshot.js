
// const { chromium } = require('playwright');
// const path = require('path');
// const fs = require('fs');
// const mongoose = require('mongoose'); // Assuming you're using Mongoose

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://akashpawar:akashpawar@cluster0.1cuo7.mongodb.net/test')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));


// const screenshotModel = mongoose.model('Screenshot', {
//     image: Buffer,
//     fileName: String,
// });

// const cookiesFilePath = path.join(__dirname, 'cookies.json');

// async function saveCookies(context) {
//     const cookies = await context.cookies();
//     fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies));
// }

// async function loadCookies(context) {
//     if (fs.existsSync(cookiesFilePath)) {
//         const cookies = JSON.parse(fs.readFileSync(cookiesFilePath));
//         await context.addCookies(cookies);
//     }
// }

// async function takeScreenshot() {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     // Load cookies if they exist
//     await loadCookies(context);

//     // Add custom header to bypass middleware
//     await page.setExtraHTTPHeaders({
//         'x-screenshot': 'true',
//     });

//     await page.goto('https://github.com/akashpawar07/work-manager');

//     // Take screenshot and store as buffer
//     const screenshotBuffer = await page.screenshot({ fullPage: true });

//     // Save screenshot to database
//     const timestamp = new Date().toISOString().replace(/:/g, '-');
//     const screenshot = new screenshotModel({
//         image: screenshotBuffer,
//         fileName: `Screenshot-${timestamp}.png`,
//     });
//     await screenshot.save();

//     console.log('Screenshot saved to database!');

//     await browser.close();
// }

// async function startTakingScreenshots() {
//     await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds

//     while (true) {
//         await takeScreenshot();
//         console.log('Screenshot taken!');
//         await new Promise((resolve) => setTimeout(resolve, 5 * 60 * 1000)); // Wait for 10 minutes
//     }
// }

// startTakingScreenshots().catch(console.error);


const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://akashpawar:akashpawar@cluster0.1cuo7.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const screenshotModel = mongoose.model('Screenshot', {
    image: Buffer,
    fileName: String,
});

const cookiesFilePath = path.join(__dirname, 'cookies.json');

async function saveCookies(context) {
    const cookies = await context.cookies();
    fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies));
}

async function loadCookies(context) {
    if (fs.existsSync(cookiesFilePath)) {
        const cookies = JSON.parse(fs.readFileSync(cookiesFilePath));
        await context.addCookies(cookies);
    }
}

async function takeScreenshot(page) {
    const screenshotBuffer = await page.screenshot({ fullPage: true });

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const screenshot = new screenshotModel({
        image: screenshotBuffer,
        fileName: `Screenshot-${timestamp}.png`,
    });
    await screenshot.save();
    console.log('Screenshot saved to database!');
}

async function startTakingScreenshots() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await loadCookies(context);

    await page.setExtraHTTPHeaders({
        'x-screenshot': 'true',
    });

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds

    while (true) {
        await takeScreenshot(page);
        console.log('Screenshot taken!');
        await new Promise((resolve) => setTimeout(resolve, 5 * 60 * 1000)); // Wait for 10 minutes
    }
}

startTakingScreenshots().catch(console.error);