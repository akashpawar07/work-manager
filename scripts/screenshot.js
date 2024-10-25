const isProd = process.env.NODE_ENV === 'production';
const puppeteer = isProd ? require('puppeteer-core') : require('puppeteer');
const chromium = require('@sparticuz/chromium');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Environment variables with defaults
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs";
const SCREENSHOT_INTERVAL = process.env.SCREENSHOT_INTERVAL || 60000; // 1 minute in milliseconds
const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:3000/profile/show-projects';

// MongoDB connection
async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

const screenshotModel = mongoose.model('Screenshot', {
    image: Buffer,
    fileName: String,
    createdAt: { type: Date, default: Date.now }
});

const cookiesFilePath = path.join(__dirname, 'cookies.json');

async function saveCookies(page) {
    try {
        const cookies = await page.cookies();
        fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies));
    } catch (error) {
        console.error('Error saving cookies:', error);
    }
}

async function loadCookies(page) {
    try {
        if (fs.existsSync(cookiesFilePath)) {
            const cookies = JSON.parse(fs.readFileSync(cookiesFilePath));
            await page.setCookie(...cookies);
        }
    } catch (error) {
        console.error('Error loading cookies:', error);
    }
}

async function takeScreenshot(page) {
    try {
        await page.goto(WEBSITE_URL, { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });

        // Removed quality option since we're using PNG
        const screenshotBuffer = await page.screenshot({ 
            fullPage: true,
            type: 'png'  // Explicitly set to PNG
        });

        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const screenshot = new screenshotModel({
            image: Buffer.from(screenshotBuffer),
            fileName: `Screenshot-${timestamp}.png`,
        });
        await screenshot.save();
        console.log(`Screenshot saved to database: Screenshot-${timestamp}.png`);
    } catch (error) {
        console.error('Error taking screenshot:', error);
        throw error;
    }
}

async function getBrowser() {
    try {
        if (isProd) {
            return await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            });
        } else {
            return await puppeteer.launch({
                headless: "new",
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                ignoreHTTPSErrors: true
            });
        }
    } catch (error) {
        console.error('Error launching browser:', error);
        throw error;
    }
}

async function startTakingScreenshots() {
    let browser = null;
    let page = null;

    try {
        await connectDB();
        browser = await getBrowser();
        page = await browser.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080
        });

        await loadCookies(page);

        await page.setExtraHTTPHeaders({
            'x-screenshot': 'true',
        });

        console.log('Starting screenshot loop...');
        
        while (true) {
            try {
                await takeScreenshot(page);
                await saveCookies(page);
                console.log(`Waiting ${SCREENSHOT_INTERVAL/1000} seconds until next screenshot...`);
                await new Promise(resolve => setTimeout(resolve, SCREENSHOT_INTERVAL));
            } catch (error) {
                console.error('Error in screenshot loop:', error);
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    } catch (error) {
        console.error('Fatal error in screenshot service:', error);
    } finally {
        if (page) await page.close().catch(console.error);
        if (browser) await browser.close().catch(console.error);
    }
}

// Start the service with error handling
startTakingScreenshots().catch(error => {
    console.error('Error starting screenshot service:', error);
    process.exit(1);
});

// Handle process termination
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM signal. Cleaning up...');
    mongoose.connection.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT signal. Cleaning up...');
    mongoose.connection.close();
    process.exit(0);
});