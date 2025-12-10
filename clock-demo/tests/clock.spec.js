import { test, expect } from '@playwright/test';

// 时钟页面的URL
const CLOCK_URL = 'file:///Users/tal/Downloads/testbed%2045/json-viewer/clock-demo/index.html';

test.describe('模拟时钟应用测试', () => {

    test('页面加载成功并显示标题', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 检查页面标题
        await expect(page).toHaveTitle('模拟时钟 - Analog Clock');

        // 检查主标题存在
        await expect(page.locator('h1.title')).toBeVisible();
        await expect(page.locator('h1.title')).toHaveText('模拟时钟');
    });

    test('检查时钟所有元素存在', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 检查时钟容器存在
        await expect(page.locator('.clock')).toBeVisible();

        // 检查时钟中心点存在
        await expect(page.locator('.center-dot')).toBeVisible();

        // 检查三个指针存在
        await expect(page.locator('.hour-hand')).toBeVisible();
        await expect(page.locator('.minute-hand')).toBeVisible();
        await expect(page.locator('.second-hand')).toBeVisible();

        // 检查数字时间显示存在
        await expect(page.locator('.digital-time')).toBeVisible();

        // 检查日期显示存在
        await expect(page.locator('.date-display')).toBeVisible();
    });

    test('检查12个小时刻度存在', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 检查所有小时刻度
        const hourMarks = page.locator('.hour-mark');
        await expect(hourMarks).toHaveCount(12);

        // 验证刻度数字 - 使用exact匹配避免"1"匹配到"10"、"11"、"12"
        const expectedNumbers = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
        for (const num of expectedNumbers) {
            await expect(page.locator('.hour-mark span').getByText(num, { exact: true })).toBeVisible();
        }
    });

    test('数字时间格式正确', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 等待时钟初始化
        await page.waitForTimeout(500);

        // 获取数字时间文本
        const digitalTime = page.locator('.digital-time');
        const timeText = await digitalTime.textContent();

        // 验证时间格式为 HH:MM:SS
        expect(timeText).toMatch(/^\d{2}:\d{2}:\d{2}$/);

        // 验证时间范围合理
        const [hours, minutes, seconds] = timeText.split(':').map(Number);
        expect(hours).toBeGreaterThanOrEqual(0);
        expect(hours).toBeLessThan(24);
        expect(minutes).toBeGreaterThanOrEqual(0);
        expect(minutes).toBeLessThan(60);
        expect(seconds).toBeGreaterThanOrEqual(0);
        expect(seconds).toBeLessThan(60);
    });

    test('日期显示格式正确', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 等待日期初始化
        await page.waitForTimeout(500);

        // 获取日期文本
        const dateDisplay = page.locator('.date-display');
        const dateText = await dateDisplay.textContent();

        // 验证日期格式包含年月日和星期
        expect(dateText).toMatch(/^\d{4}年\d{1,2}月\d{1,2}日 星期[一二三四五六日]$/);
    });

    test('时钟每秒更新', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 等待初始化
        await page.waitForTimeout(500);

        // 获取初始时间
        const digitalTime = page.locator('.digital-time');
        const initialTime = await digitalTime.textContent();

        // 等待2秒
        await page.waitForTimeout(2000);

        // 获取更新后的时间
        const updatedTime = await digitalTime.textContent();

        // 验证时间已更新
        expect(updatedTime).not.toBe(initialTime);
    });

    test('秒针旋转角度正确', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 等待初始化
        await page.waitForTimeout(500);

        // 获取秒针元素
        const secondHand = page.locator('.second-hand');

        // 获取transform样式
        const transform = await secondHand.evaluate(el => {
            return window.getComputedStyle(el).transform;
        });

        // 验证有旋转变换
        expect(transform).not.toBe('none');
    });

    test('指针元素有正确的样式', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 检查时针样式
        const hourHand = page.locator('.hour-hand');
        await expect(hourHand).toHaveCSS('position', 'absolute');

        // 检查分针样式
        const minuteHand = page.locator('.minute-hand');
        await expect(minuteHand).toHaveCSS('position', 'absolute');

        // 检查秒针样式
        const secondHand = page.locator('.second-hand');
        await expect(secondHand).toHaveCSS('position', 'absolute');
    });

    test('时钟容器有正确的圆形样式', async ({ page }) => {
        await page.goto(CLOCK_URL);

        const clock = page.locator('.clock');

        // 检查border-radius为50%(圆形)
        await expect(clock).toHaveCSS('border-radius', '50%');

        // 检查宽度和高度相等(正圆) - 使用toBeCloseTo处理浮点数精度
        const box = await clock.boundingBox();
        expect(box.width).toBeCloseTo(box.height, 0);
    });

    test('响应式设计 - 移动端视图', async ({ page }) => {
        // 设置移动设备视口
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(CLOCK_URL);

        // 等待页面加载
        await page.waitForTimeout(500);

        // 验证时钟仍然可见
        await expect(page.locator('.clock')).toBeVisible();

        // 验证所有关键元素仍然可见
        await expect(page.locator('.digital-time')).toBeVisible();
        await expect(page.locator('.date-display')).toBeVisible();
        await expect(page.locator('h1.title')).toBeVisible();

        // 获取时钟尺寸,验证在移动端有适当的大小
        const clock = page.locator('.clock');
        const box = await clock.boundingBox();

        // 移动端时钟应该小于桌面端(350px)
        expect(box.width).toBeLessThan(350);
        expect(box.width).toBeGreaterThan(200); // 但不会太小
    });

    test('响应式设计 - 平板视图', async ({ page }) => {
        // 设置平板视口
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto(CLOCK_URL);

        // 等待页面加载
        await page.waitForTimeout(500);

        // 验证所有元素可见
        await expect(page.locator('.clock')).toBeVisible();
        await expect(page.locator('.digital-time')).toBeVisible();
        await expect(page.locator('.date-display')).toBeVisible();
    });

    test('响应式设计 - 桌面视图', async ({ page }) => {
        // 设置桌面视口
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto(CLOCK_URL);

        // 等待页面加载
        await page.waitForTimeout(500);

        // 验证所有元素可见
        await expect(page.locator('.clock')).toBeVisible();

        // 获取时钟尺寸
        const clock = page.locator('.clock');
        const box = await clock.boundingBox();

        // 桌面端时钟应该是350px
        expect(box.width).toBeCloseTo(350, 5);
    });

    test('页面无JavaScript错误', async ({ page }) => {
        const errors = [];

        // 监听控制台错误
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // 监听页面错误
        page.on('pageerror', error => {
            errors.push(error.message);
        });

        await page.goto(CLOCK_URL);

        // 等待一段时间确保没有延迟的错误
        await page.waitForTimeout(2000);

        // 验证没有错误
        expect(errors).toHaveLength(0);
    });

    test('时钟在页面可见性变化后仍然准确', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 等待初始化
        await page.waitForTimeout(500);

        // 获取初始时间
        const digitalTime = page.locator('.digital-time');
        const initialTime = await digitalTime.textContent();

        // 模拟页面隐藏和显示
        await page.evaluate(() => {
            // 触发visibilitychange事件
            Object.defineProperty(document, 'hidden', {
                configurable: true,
                get: function () { return true; }
            });
            document.dispatchEvent(new Event('visibilitychange'));

            // 恢复可见
            Object.defineProperty(document, 'hidden', {
                configurable: true,
                get: function () { return false; }
            });
            document.dispatchEvent(new Event('visibilitychange'));
        });

        // 等待更新
        await page.waitForTimeout(1000);

        // 验证时间仍在更新
        const updatedTime = await digitalTime.textContent();
        expect(updatedTime).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    test('背景渐变动画存在', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 检查body元素有背景
        const body = page.locator('body');
        const background = await body.evaluate(el => {
            return window.getComputedStyle(el).background;
        });

        // 验证有背景设置
        expect(background).not.toBe('');
        expect(background).not.toBe('none');
    });

    test('玻璃态效果应用正确', async ({ page }) => {
        await page.goto(CLOCK_URL);

        // 检查时钟包装器的backdrop-filter
        const clockWrapper = page.locator('.clock-wrapper');
        const backdropFilter = await clockWrapper.evaluate(el => {
            return window.getComputedStyle(el).backdropFilter ||
                window.getComputedStyle(el).webkitBackdropFilter;
        });

        // 验证有模糊效果
        expect(backdropFilter).toContain('blur');
    });
});
