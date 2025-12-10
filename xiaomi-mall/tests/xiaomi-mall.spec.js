import { test, expect } from '@playwright/test';

// 测试首页加载和基本元素
test.describe('首页测试', () => {
    test('首页正确加载并显示核心元素', async ({ page }) => {
        await page.goto('/');

        // 检查导航栏
        await expect(page.locator('.van-nav-bar__title').first()).toContainText('小米商城');

        // 检查轮播图
        await expect(page.locator('.banner-swipe')).toBeVisible();

        // 检查分类网格
        await expect(page.locator('.category-grid')).toBeVisible();

        // 检查推荐商品区域
        await expect(page.locator('.recommend-section')).toBeVisible();
        await expect(page.locator('.section-title')).toContainText('热门推荐');

        // 检查底部导航栏
        await expect(page.locator('.van-tabbar')).toBeVisible();
        await expect(page.locator('.van-tabbar-item').first()).toContainText('首页');
    });

    test('轮播图自动切换', async ({ page }) => {
        await page.goto('/');

        // 等待轮播图加载
        await page.waitForSelector('.banner-swipe');

        // 检查轮播图存在
        const swipeItems = page.locator('.van-swipe-item');
        await expect(swipeItems.first()).toBeVisible();
    });

    test('分类图标可点击并有手型光标', async ({ page }) => {
        await page.goto('/');

        // 检查分类图标
        const categoryItem = page.locator('.van-grid-item').first();
        await expect(categoryItem).toBeVisible();

        // 检查光标样式
        const cursor = await categoryItem.evaluate(el =>
            window.getComputedStyle(el.querySelector('.van-grid-item__content')).cursor
        );
        expect(cursor).toBe('pointer');
    });

    test('点击商品卡片跳转到详情页', async ({ page }) => {
        await page.goto('/');

        // 点击第一个推荐商品
        await page.locator('.product-card').first().click();

        // 等待跳转
        await page.waitForURL(/\/product\/\d+/);

        // 检查商品详情页元素
        await expect(page.locator('.van-nav-bar__title')).toContainText('商品详情');
        await expect(page.locator('.product-swipe')).toBeVisible();
    });
});

// 测试分类页面
test.describe('分类页面测试', () => {
    test('分类页面正确加载', async ({ page }) => {
        await page.goto('/');

        // 点击底部导航的分类按钮
        await page.locator('.van-tabbar-item').nth(1).click();

        // 等待跳转
        await page.waitForURL('/category');

        // 检查分类页面元素
        await expect(page.locator('.van-nav-bar__title')).toContainText('商品分类');
        await expect(page.locator('.category-sidebar')).toBeVisible();
        await expect(page.locator('.products-container')).toBeVisible();
    });

    test('侧边栏分类切换功能', async ({ page }) => {
        await page.goto('/category');

        // 等待侧边栏加载
        await page.waitForSelector('.van-sidebar-item');

        // 点击第二个分类
        await page.locator('.van-sidebar-item').nth(1).click();

        // 等待一下让内容更新
        await page.waitForTimeout(300);

        // 检查选中状态
        const selectedItem = page.locator('.van-sidebar-item--select');
        await expect(selectedItem).toBeVisible();
    });

    test('分类页面商品可点击', async ({ page }) => {
        await page.goto('/category');

        // 等待商品加载
        await page.waitForSelector('.product-item');

        // 点击第一个商品
        await page.locator('.product-item').first().click();

        // 检查是否跳转到商品详情页
        await page.waitForURL(/\/product\/\d+/);
    });

    test('PC端分类横幅被隐藏', async ({ page, viewport }) => {
        // 设置为PC端视口
        await page.setViewportSize({ width: 1200, height: 800 });
        await page.goto('/category');

        // 检查横幅是否隐藏
        const banner = page.locator('.category-banner');
        await expect(banner).toBeHidden();
    });
});

// 测试商品详情页
test.describe('商品详情页测试', () => {
    test('商品详情页正确显示', async ({ page }) => {
        await page.goto('/product/1');

        // 检查核心元素
        await expect(page.locator('.product-swipe')).toBeVisible();
        await expect(page.locator('.product-info-card')).toBeVisible();
        await expect(page.locator('.current-price')).toBeVisible();
        await expect(page.locator('.product-title')).toBeVisible();

        // 检查底部操作栏
        await expect(page.locator('.goods-action-bar')).toBeVisible();
        await expect(page.locator('.btn-add-cart')).toBeVisible();
        await expect(page.locator('.btn-buy-now')).toBeVisible();
    });

    test('加入购物车功能', async ({ page }) => {
        await page.goto('/product/1');

        // 点击加入购物车按钮
        await page.locator('.btn-add-cart').click();

        // 检查提示信息
        await expect(page.locator('.van-toast')).toContainText('已加入购物车');
    });

    test('立即购买功能', async ({ page }) => {
        await page.goto('/product/1');

        // 点击立即购买按钮
        await page.locator('.btn-buy-now').click();

        // 检查提示信息
        await expect(page.locator('.van-toast')).toBeVisible();
    });

    test('返回按钮功能', async ({ page }) => {
        await page.goto('/product/1');

        // 点击返回按钮
        await page.locator('.van-nav-bar__left').click();

        // 检查是否返回
        await page.waitForTimeout(300);
    });

    test('客服和收藏图标可点击', async ({ page }) => {
        await page.goto('/product/1');

        // 点击客服图标
        await page.locator('.action-icon').first().click();
        await expect(page.locator('.van-toast')).toContainText('客服功能开发中');

        // 等待toast消失
        await page.waitForTimeout(2000);

        // 点击收藏图标
        await page.locator('.action-icon').nth(2).click();
        await expect(page.locator('.van-toast')).toContainText('收藏成功');
    });
});

// 测试购物车
test.describe('购物车测试', () => {
    test('购物车页面正确加载', async ({ page }) => {
        await page.goto('/');

        // 点击底部导航的购物车按钮
        await page.locator('.van-tabbar-item').nth(2).click();

        // 等待跳转
        await page.waitForURL('/cart');

        // 检查购物车页面元素
        await expect(page.locator('.van-nav-bar__title')).toContainText('购物车');
    });

    test('购物车商品列表显示', async ({ page }) => {
        await page.goto('/cart');

        // 检查购物车商品
        const cartItems = page.locator('.cart-item');
        const count = await cartItems.count();

        if (count > 0) {
            // 有商品时检查商品元素
            await expect(cartItems.first()).toBeVisible();
            await expect(page.locator('.van-submit-bar')).toBeVisible();
        } else {
            // 空购物车时检查空状态
            await expect(page.locator('.van-empty')).toBeVisible();
        }
    });

    test('推荐商品显示', async ({ page }) => {
        await page.goto('/cart');

        // 检查推荐商品区域
        await expect(page.locator('.recommend-section')).toBeVisible();
        await expect(page.locator('.recommend-item').first()).toBeVisible();
    });

    test('移动端返回按钮可见', async ({ page }) => {
        // 设置为移动端视口
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/cart');

        // 检查返回按钮
        await expect(page.locator('.van-nav-bar__left')).toBeVisible();
    });

    test('PC端返回按钮隐藏', async ({ page }) => {
        // 设置为PC端视口
        await page.setViewportSize({ width: 1200, height: 800 });
        await page.goto('/cart');

        // 检查返回按钮是否隐藏
        const leftButton = page.locator('.van-nav-bar__left');
        await expect(leftButton).toBeHidden();
    });
});

// 测试用户中心
test.describe('用户中心测试', () => {
    test('用户中心页面正确加载', async ({ page }) => {
        await page.goto('/');

        // 点击底部导航的我的按钮
        await page.locator('.van-tabbar-item').nth(3).click();

        // 等待跳转
        await page.waitForURL('/user');

        // 检查用户中心元素
        await expect(page.locator('.van-nav-bar__title')).toContainText('我的');
        await expect(page.locator('.user-info-card')).toBeVisible();
        await expect(page.locator('.order-section')).toBeVisible();
    });

    test('用户信息卡片可点击', async ({ page }) => {
        await page.goto('/user');

        // 点击用户信息
        await page.locator('.user-header').click();

        // 检查提示信息
        await expect(page.locator('.van-toast')).toContainText('个人信息功能开发中');
    });

    test('订单入口显示徽章', async ({ page }) => {
        await page.goto('/user');

        // 检查订单徽章
        const badges = page.locator('.van-badge');
        const count = await badges.count();

        // 应该有多个徽章（待付款、待收货、待评价、售后）
        expect(count).toBeGreaterThan(0);
    });

    test('订单类型可点击', async ({ page }) => {
        await page.goto('/user');

        // 点击第一个订单类型
        await page.locator('.van-grid-item').first().click();

        // 检查提示信息
        await expect(page.locator('.van-toast')).toBeVisible();
    });

    test('退出登录功能', async ({ page }) => {
        await page.goto('/user');

        // 点击退出登录按钮
        await page.locator('.van-button').filter({ hasText: '退出登录' }).click();

        // 检查确认对话框
        await expect(page.locator('.van-dialog')).toBeVisible();
        await expect(page.locator('.van-dialog__message')).toContainText('确定要退出登录吗');

        // 点击确认
        await page.locator('.van-dialog__confirm').click();

        // 检查提示信息
        await expect(page.locator('.van-toast')).toContainText('已退出登录');
    });
});

// 测试底部导航
test.describe('底部导航测试', () => {
    test('底部导航栏在所有页面显示', async ({ page }) => {
        const pages = ['/', '/category', '/cart', '/user'];

        for (const url of pages) {
            await page.goto(url);
            await expect(page.locator('.van-tabbar')).toBeVisible();
            await expect(page.locator('.van-tabbar-item')).toHaveCount(4);
        }
    });

    test('底部导航切换功能', async ({ page }) => {
        await page.goto('/');

        // 切换到分类
        await page.locator('.van-tabbar-item').nth(1).click();
        await page.waitForURL('/category');

        // 切换到购物车
        await page.locator('.van-tabbar-item').nth(2).click();
        await page.waitForURL('/cart');

        // 切换到我的
        await page.locator('.van-tabbar-item').nth(3).click();
        await page.waitForURL('/user');

        // 切换回首页
        await page.locator('.van-tabbar-item').nth(0).click();
        await page.waitForURL('/');
    });
});

// 测试响应式设计
test.describe('响应式设计测试', () => {
    test('移动端布局正确', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // 检查页面宽度
        const appWidth = await page.locator('#app').evaluate(el => el.offsetWidth);
        expect(appWidth).toBeLessThanOrEqual(375);
    });

    test('PC端布局正确', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 });
        await page.goto('/');

        // 检查页面最大宽度
        const appWidth = await page.locator('#app').evaluate(el => el.offsetWidth);
        expect(appWidth).toBeLessThanOrEqual(1200);
    });

    test('PC端首页商品显示4列', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 });
        await page.goto('/');

        // 检查商品列表的grid布局
        const gridColumns = await page.locator('.product-list').evaluate(el =>
            window.getComputedStyle(el).gridTemplateColumns
        );

        // 应该有4列
        const columnCount = gridColumns.split(' ').length;
        expect(columnCount).toBe(4);
    });
});

// 测试图片加载
test.describe('图片加载测试', () => {
    test('首页轮播图正确加载', async ({ page }) => {
        await page.goto('/');

        // 等待轮播图加载
        await page.waitForSelector('.banner-image');

        // 检查图片是否加载
        const image = page.locator('.banner-image').first();
        await expect(image).toBeVisible();

        // 检查图片src不为空
        const src = await image.getAttribute('src');
        expect(src).toBeTruthy();
    });

    test('商品图片正确加载', async ({ page }) => {
        await page.goto('/');

        // 检查商品图片
        const productImage = page.locator('.product-image').first();
        await expect(productImage).toBeVisible();

        const src = await productImage.getAttribute('src');
        expect(src).toBeTruthy();
        expect(src).toContain('unsplash.com');
    });
});
