import { test, expect } from '@playwright/test';

test.describe('民宿租房应用 - 核心功能测试', () => {

    test('首页加载和房源展示', async ({ page }) => {
        await page.goto('/');

        // 验证页面标题
        await expect(page.locator('.hero-title')).toContainText('发现您的理想住所');

        // 验证搜索框存在
        await expect(page.locator('.search-input')).toBeVisible();

        // 验证房源卡片存在
        const roomCards = page.locator('.room-card');
        await expect(roomCards).toHaveCount(6);

        // 验证第一个房源卡片的内容
        const firstCard = roomCards.first();
        await expect(firstCard.locator('.room-title')).toBeVisible();
        await expect(firstCard.locator('.price')).toBeVisible();
        await expect(firstCard.locator('.rating-badge')).toBeVisible();
    });

    test('搜索功能测试', async ({ page }) => {
        await page.goto('/');

        // 输入搜索关键词
        await page.fill('.search-input', '海景');

        // 等待搜索结果更新
        await page.waitForTimeout(500);

        // 验证搜索结果
        const roomCards = page.locator('.room-card');
        const count = await roomCards.count();
        expect(count).toBeGreaterThan(0);

        // 验证搜索结果包含关键词
        const firstCardTitle = await roomCards.first().locator('.room-title').textContent();
        expect(firstCardTitle).toContain('海景');
    });

    test('房源详情页导航', async ({ page }) => {
        await page.goto('/');

        // 点击第一个房源卡片
        await page.locator('.room-card').first().click();

        // 验证 URL 变化
        await expect(page).toHaveURL(/\/room\/\d+/);

        // 验证详情页元素
        await expect(page.locator('.room-title')).toBeVisible();
        await expect(page.locator('.main-image')).toBeVisible();
        await expect(page.locator('.booking-card')).toBeVisible();
        await expect(page.locator('.book-button')).toBeVisible();
    });

    test('房源详情页 - 图片轮播', async ({ page }) => {
        await page.goto('/room/1');

        // 验证主图片存在
        await expect(page.locator('.main-image img')).toBeVisible();

        // 验证缩略图存在
        const thumbnails = page.locator('.thumbnail');
        await expect(thumbnails).toHaveCount(3);

        // 点击第二个缩略图
        await thumbnails.nth(1).click();

        // 验证第二个缩略图被激活
        await expect(thumbnails.nth(1)).toHaveClass(/active/);
    });

    test('房源详情页 - 房东信息和设施', async ({ page }) => {
        await page.goto('/room/1');

        // 验证房东信息
        await expect(page.locator('.host-name')).toBeVisible();
        await expect(page.locator('.host-intro')).toBeVisible();

        // 验证房源描述
        await expect(page.locator('.description')).toBeVisible();

        // 验证设施列表
        const facilities = page.locator('.facility-item');
        const facilityCount = await facilities.count();
        expect(facilityCount).toBeGreaterThan(0);

        // 验证用户评价
        const reviews = page.locator('.review-card');
        const reviewCount = await reviews.count();
        expect(reviewCount).toBeGreaterThan(0);
    });

    test('房源详情页 - 预订按钮', async ({ page }) => {
        await page.goto('/room/1');

        // 设置对话框处理
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('预订功能开发中');
            await dialog.accept();
        });

        // 点击预订按钮
        await page.click('.book-button');
    });

    test('返回首页功能', async ({ page }) => {
        await page.goto('/room/1');

        // 点击返回按钮
        await page.click('.back-button');

        // 验证返回到首页
        await expect(page).toHaveURL('/');
        await expect(page.locator('.hero-title')).toBeVisible();
    });

    test('搜索页面导航', async ({ page }) => {
        await page.goto('/');

        // 点击搜索房源链接
        await page.click('a[href="/search"]');

        // 验证 URL
        await expect(page).toHaveURL('/search');

        // 验证搜索页面元素
        await expect(page.locator('.search-header h1')).toContainText('搜索房源');
        await expect(page.locator('.filters-sidebar')).toBeVisible();
        await expect(page.locator('.search-results')).toBeVisible();
    });

    test('搜索页面 - 价格筛选', async ({ page }) => {
        await page.goto('/search');

        // 验证所有房源显示
        let roomCards = page.locator('.room-card');
        await expect(roomCards).toHaveCount(6);

        // 点击价格筛选
        await page.click('button:has-text("¥0-500")');

        // 等待筛选结果更新
        await page.waitForTimeout(500);

        // 验证筛选后的房源数量
        roomCards = page.locator('.room-card');
        const count = await roomCards.count();
        expect(count).toBeGreaterThan(0);
        expect(count).toBeLessThanOrEqual(6);
    });

    test('搜索页面 - 清除筛选', async ({ page }) => {
        await page.goto('/search');

        // 应用筛选
        await page.click('button:has-text("¥0-500")');
        await page.waitForTimeout(500);

        // 点击清除筛选
        await page.click('.clear-button');
        await page.waitForTimeout(500);

        // 验证所有房源重新显示
        const roomCards = page.locator('.room-card');
        await expect(roomCards).toHaveCount(6);
    });

    test('导航栏功能', async ({ page }) => {
        await page.goto('/');

        // 验证导航栏存在
        await expect(page.locator('.navbar')).toBeVisible();
        await expect(page.locator('.logo')).toBeVisible();

        // 验证导航链接
        await expect(page.locator('a[href="/"]').first()).toBeVisible();
        await expect(page.locator('a[href="/search"]')).toBeVisible();

        // 点击 Logo 返回首页
        await page.goto('/search');
        await page.click('.logo');
        await expect(page).toHaveURL('/');
    });

    test('页脚信息显示', async ({ page }) => {
        await page.goto('/');

        // 滚动到页面底部
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        // 验证页脚存在
        await expect(page.locator('.footer')).toBeVisible();
        await expect(page.locator('.footer-container')).toBeVisible();

        // 验证版权信息
        await expect(page.locator('.footer-bottom')).toContainText('2024 悦居民宿');
    });

    test('响应式设计 - 移动端视图', async ({ page }) => {
        // 设置移动端视口
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // 验证页面在移动端正常显示
        await expect(page.locator('.hero-title')).toBeVisible();
        await expect(page.locator('.search-input')).toBeVisible();

        // 验证房源卡片在移动端正常显示
        const roomCards = page.locator('.room-card');
        await expect(roomCards.first()).toBeVisible();
    });

    test('房源卡片悬停效果', async ({ page }) => {
        await page.goto('/');

        const firstCard = page.locator('.room-card').first();

        // 获取初始位置
        const initialBox = await firstCard.boundingBox();

        // 悬停在卡片上
        await firstCard.hover();

        // 等待动画完成
        await page.waitForTimeout(500);

        // 验证卡片位置发生变化（向上移动）
        const hoverBox = await firstCard.boundingBox();
        expect(hoverBox.y).toBeLessThan(initialBox.y);
    });

    test('搜索框实时搜索', async ({ page }) => {
        await page.goto('/');

        // 输入搜索关键词
        await page.fill('.search-input', '上海');
        await page.waitForTimeout(500);

        // 验证搜索结果
        let roomCards = page.locator('.room-card');
        let count = await roomCards.count();
        expect(count).toBeGreaterThan(0);

        // 清空搜索框
        await page.fill('.search-input', '');
        await page.waitForTimeout(500);

        // 验证所有房源重新显示
        roomCards = page.locator('.room-card');
        await expect(roomCards).toHaveCount(6);
    });

    test('房源详情页 - 房间规格显示', async ({ page }) => {
        await page.goto('/room/1');

        // 验证房间规格信息
        await expect(page.locator('.spec-item').filter({ hasText: '卧室' })).toBeVisible();
        await expect(page.locator('.spec-item').filter({ hasText: '床' })).toBeVisible();
        await expect(page.locator('.spec-item').filter({ hasText: '卫生间' })).toBeVisible();
        await expect(page.locator('.spec-item').filter({ hasText: '房客' })).toBeVisible();
    });
});
