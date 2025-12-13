import { test, expect } from '@playwright/test';

test.describe('捐赠页面核心功能测试', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
    });

    test('页面正确加载', async ({ page }) => {
        // 检查页面标题
        await expect(page).toHaveTitle(/支持我们的项目/);

        // 检查主要元素存在
        await expect(page.locator('.header-title')).toBeVisible();
        await expect(page.locator('.amount-btn')).toHaveCount(5);
        await expect(page.locator('#customAmount')).toBeVisible();
        await expect(page.locator('#payBtn')).toBeVisible();
    });

    test('选择预设金额', async ({ page }) => {
        // 点击 ¥100 按钮
        await page.locator('.amount-btn[data-amount="100"]').click();

        // 检查按钮激活状态
        await expect(page.locator('.amount-btn.active')).toHaveCount(1);

        // 检查当前选择显示
        await expect(page.locator('#selectedValue')).toContainText('¥100');

        // 检查支付按钮已启用
        await expect(page.locator('#payBtn')).toBeEnabled();
    });

    test('输入自定义金额', async ({ page }) => {
        // 输入自定义金额
        await page.locator('#customAmount').fill('888');
        await page.waitForTimeout(300);

        // 检查当前选择显示
        await expect(page.locator('#selectedValue')).toContainText('¥888');

        // 检查支付按钮已启用
        await expect(page.locator('#payBtn')).toBeEnabled();
    });

    test('完整支付流程', async ({ page }) => {
        // 选择金额
        await page.locator('.amount-btn[data-amount="100"]').click();
        await page.waitForTimeout(300);

        // 点击支付按钮
        await page.locator('#payBtn').click();
        await page.waitForTimeout(800);

        // 检查成功模态框显示
        await expect(page.locator('#successModal')).toHaveClass(/show/);
        await expect(page.locator('.success-title')).toContainText('捐赠成功');
        await expect(page.locator('#successAmount')).toContainText('¥100');

        // 关闭模态框
        await page.locator('#closeBtn').click();
        await page.waitForTimeout(500);

        // 检查模态框已关闭
        await expect(page.locator('#successModal')).not.toHaveClass(/show/);

        // 检查状态已重置
        await expect(page.locator('#selectedValue')).toContainText('请选择金额');
        await expect(page.locator('#payBtn')).toBeDisabled();
    });

    test('切换不同金额', async ({ page }) => {
        // 选择 ¥50
        await page.locator('.amount-btn[data-amount="50"]').click();
        await page.waitForTimeout(200);
        await expect(page.locator('#selectedValue')).toContainText('¥50');

        // 再选择 ¥200
        await page.locator('.amount-btn[data-amount="200"]').click();
        await page.waitForTimeout(200);
        await expect(page.locator('#selectedValue')).toContainText('¥200');

        // 检查只有一个按钮是激活状态
        await expect(page.locator('.amount-btn.active')).toHaveCount(1);
    });

    test('自定义金额覆盖预设金额', async ({ page }) => {
        // 先选择预设金额
        await page.locator('.amount-btn[data-amount="100"]').click();
        await page.waitForTimeout(200);

        // 输入自定义金额
        await page.locator('#customAmount').fill('666');
        await page.waitForTimeout(300);

        // 检查预设按钮都不是激活状态
        await expect(page.locator('.amount-btn.active')).toHaveCount(0);

        // 检查显示自定义金额
        await expect(page.locator('#selectedValue')).toContainText('¥666');
    });

    test('信息卡片显示正确', async ({ page }) => {
        const cards = page.locator('.info-card');
        await expect(cards).toHaveCount(3);

        // 检查卡片标题
        await expect(cards.nth(0).locator('h3')).toContainText('持续创新');
        await expect(cards.nth(1).locator('h3')).toContainText('开源精神');
        await expect(cards.nth(2).locator('h3')).toContainText('未来规划');
    });

    test('响应式布局', async ({ page }) => {
        // 测试桌面端
        await page.setViewportSize({ width: 1200, height: 800 });
        await expect(page.locator('.container')).toBeVisible();

        // 测试移动端
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(page.locator('.container')).toBeVisible();
    });
});
