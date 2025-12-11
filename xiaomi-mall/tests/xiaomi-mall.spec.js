import { test, expect } from '@playwright/test';

// 测试首页加载和基本元素
test.describe('首页测试', () => {
    test('首页正确加载并显示核心元素', async ({ page }) => {
        await page.goto('/');

        // 等待页面加载
        await page.waitForTimeout(1000);

        // 检查导航栏
        await expect(page.locator('.van-nav-bar__title').first()).toContainText('小米商城');

        // 检查轮播图
        await expect(page.locator('.banner-swipe')).toBeVisible();

        // 检查分类网格
        await expect(page.locator('.category-grid')).toBeVisible();

        // 检查推荐商品区域
        await expect(page.locator('.recommend-section')).toBeVisible();

        // 检查底部导航栏
        await expect(page.locator('.van-tabbar')).toBeVisible();
    });

    test('分类图标可点击', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // 检查分类图标
        const categoryItem = page.locator('.van-grid-item').first();
        await expect(categoryItem).toBeVisible();
    });

    test('点击商品卡片跳转到详情页', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // 点击第一个推荐商品
        await page.locator('.product-card').first().click();

        // 等待跳转
        await page.waitForTimeout(1000);

        // 检查商品详情页元素
        await expect(page.locator('.van-nav-bar__title')).toContainText('商品详情');
        await expect(page.locator('.product-swipe')).toBeVisible();
    });
});

// 测试分类页面
test.describe('分类页面测试', () => {
    test('分类页面正确加载', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // 点击底部导航的分类按钮
        await page.locator('.van-tabbar-item').nth(1).click();
        await page.waitForTimeout(1000);

        // 检查分类页面元素
        await expect(page.locator('.van-nav-bar__title')).toContainText('商品分类');
        await expect(page.locator('.category-sidebar')).toBeVisible();
    });

    test('侧边栏分类切换功能', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // 导航到分类页
        await page.locator('.van-tabbar-item').nth(1).click();
        await page.waitForTimeout(1000);

        // 点击第二个分类
        await page.locator('.van-sidebar-item').nth(1).click();
        await page.waitForTimeout(300);

        // 检查选中状态
        const selectedItem = page.locator('.van-sidebar-item--select');
        await expect(selectedItem).toBeVisible();
    });
});

// 测试商品详情页
test.describe('商品详情页测试', () => {
    test('商品详情页正确显示', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // 点击商品进入详情页
        await page.locator('.product-card').first().click();
        await page.waitForTimeout(1000);

        // 检查核心元素
        await expect(page.locator('.product-swipe')).toBeVisible();
        await expect(page.locator('.product-info-card')).toBeVisible();
        await expect(page.locator('.current-price')).toBeVisible();

        // 检查底部操作栏
        await expect(page.locator('.goods-action-bar')).toBeVisible();
        await expect(page.locator('.btn-add-cart')).toBeVisible();
        await expect(page.locator('.btn-buy-now')).toBeVisible();
    });

    test('加入购物车功能', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        await page.locator('.product-card').first().click();
        await page.waitForTimeout(1000);

        // 点击加入购物车按钮
        await page.locator('.btn-add-cart').click();

        // 检查提示信息
        await expect(page.locator('.van-toast')).toContainText('已加入购物车');
    });
});

// 测试购物车
test.describe('购物车测试', () => {
    test('购物车页面正确加载', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // 点击底部导航的购物车按钮
        await page.locator('.van-tabbar-item').nth(2).click();
        await page.waitForTimeout(1000);

        // 检查购物车页面元素
        await expect(page.locator('.van-nav-bar__title')).toContainText('购物车');
    });

    test('购物车商品列表显示', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        await page.locator('.van-tabbar-item').nth(2).click();
        await page.waitForTimeout(1000);

        // 检查购物车商品或空状态
        const hasItems = await page.locator('.cart-item').count() > 0;
        const isEmpty = await page.locator('.van-empty').isVisible().catch(() => false);

        expect(hasItems || isEmpty).toBeTruthy();
    });
});

// 测试用户中心
test.describe('用户中心测试', () => {
    test('用户中心页面正确加载', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // 点击底部导航的我的按钮
        await page.locator('.van-tabbar-item').nth(3).click();
        await page.waitForTimeout(1000);

        // 检查用户中心元素
        await expect(page.locator('.van-nav-bar__title')).toContainText('我的');
        await expect(page.locator('.user-info-card')).toBeVisible();
        await expect(page.locator('.order-section')).toBeVisible();
    });

    test('用户信息卡片可点击', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        await page.locator('.van-tabbar-item').nth(3).click();
        await page.waitForTimeout(1000);

        // 点击用户信息
        await page.locator('.user-header').click();

        // 检查提示信息
        await expect(page.locator('.van-toast')).toContainText('个人信息功能开发中');
    });
});

// 测试底部导航
test.describe('底部导航测试', () => {
    test('底部导航栏显示', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        await expect(page.locator('.van-tabbar')).toBeVisible();
        await expect(page.locator('.van-tabbar-item')).toHaveCount(4);
    });

    test('底部导航切换功能', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(500);

        // 切换到分类
        await page.locator('.van-tabbar-item').nth(1).click();
        await page.waitForTimeout(500);
        await expect(page.locator('.van-nav-bar__title')).toContainText('商品分类');

        // 切换到购物车
        await page.locator('.van-tabbar-item').nth(2).click();
        await page.waitForTimeout(500);
        await expect(page.locator('.van-nav-bar__title')).toContainText('购物车');

        // 切换到我的
        await page.locator('.van-tabbar-item').nth(3).click();
        await page.waitForTimeout(500);
        await expect(page.locator('.van-nav-bar__title')).toContainText('我的');

        // 切换回首页
        await page.locator('.van-tabbar-item').nth(0).click();
        await page.waitForTimeout(500);
        await expect(page.locator('.van-nav-bar__title')).toContainText('小米商城');
    });
});

// 测试图片加载
test.describe('图片加载测试', () => {
    test('首页轮播图正确加载', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(1000);

        // 检查图片是否加载
        const image = page.locator('.banner-image').first();
        await expect(image).toBeVisible();

        // 检查图片src不为空
        const src = await image.getAttribute('src');
        expect(src).toBeTruthy();
    });

    test('商品图片正确加载', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(1000);

        // 检查商品图片
        const productImage = page.locator('.product-image').first();
        await expect(productImage).toBeVisible();

        const src = await productImage.getAttribute('src');
        expect(src).toBeTruthy();
        expect(src).toContain('unsplash.com');
    });
});
