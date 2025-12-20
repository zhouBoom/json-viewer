import { test, expect } from '@playwright/test'

test.describe('设计系统 - 主要功能测试', () => {

    // 首页基础测试
    test('首页应该正确加载和显示', async ({ page }) => {
        await page.goto('/')

        await expect(page.locator('.hero-title')).toContainText('在线业务展示设计系统')
        await expect(page.locator('.feature-card')).toHaveCount(6)
        await expect(page.locator('.stat-card')).toHaveCount(4)
    })

    // 导航功能测试
    test('应该能够导航到所有主要页面', async ({ page }) => {
        await page.goto('/')

        // 导航到组件库
        await page.locator('.nav-links').getByRole('link', { name: '组件库' }).click()
        await expect(page).toHaveURL('/components')
        await expect(page.locator('h1')).toContainText('组件库文档')

        // 导航到产品展示
        await page.locator('.nav-links').getByRole('link', { name: '产品展示' }).click()
        await expect(page).toHaveURL('/products')
        await expect(page.locator('.product-card')).toHaveCount(6)

        // 导航到关于我们
        await page.locator('.nav-links').getByRole('link', { name: '关于我们' }).click()
        await expect(page).toHaveURL('/about')
        await expect(page.locator('.team-member')).toHaveCount(3)

        // 返回首页
        await page.locator('.logo').click()
        await expect(page).toHaveURL('/')
    })

    // 组件库页面测试
    test('组件库页面应该显示主要组件', async ({ page }) => {
        await page.goto('/components')

        await expect(page.locator('h1')).toContainText('组件库文档')
        await expect(page.locator('.component-section')).toHaveCount(7) // 新增了虚拟滚动树组件
        await expect(page.locator('.btn')).toHaveCount(7) // 至少有几个按钮示例
        await expect(page.locator('.virtual-tree')).toBeVisible() // 验证虚拟树组件存在
    })

    // VirtualTree 组件功能测试
    test('VirtualTree 组件展开/收起功能应该正常工作', async ({ page }) => {
        await page.goto('/components')

        // 验证虚拟树组件存在
        const virtualTree = page.locator('.virtual-tree')
        await expect(virtualTree).toBeVisible()

        // 找到第一个可展开的节点（有子节点的）
        const firstToggle = virtualTree.locator('.virtual-tree-toggle.has-children').first()
        await expect(firstToggle).toBeVisible()

        // 找到对应的展开图标
        const toggleIcon = firstToggle.locator('.toggle-icon')
        await expect(toggleIcon).toBeVisible()

        // 初始状态应该是未展开
        await expect(toggleIcon).not.toHaveClass(/expanded/)

        // 点击展开第一个节点
        await firstToggle.click()
        await page.waitForTimeout(500) // 等待展开动画

        // 验证图标现在处于展开状态
        await expect(toggleIcon).toHaveClass(/expanded/)

        // 再次点击收起该节点
        await firstToggle.click()
        await page.waitForTimeout(500) // 等待收起动画

        // 验证图标现在处于收起状态
        await expect(toggleIcon).not.toHaveClass(/expanded/)
    })

    // VirtualTree 组件基本功能验证
    test('VirtualTree 组件应该正确渲染并显示节点', async ({ page }) => {
        await page.goto('/components')

        const virtualTree = page.locator('.virtual-tree')
        await expect(virtualTree).toBeVisible()

        // 验证至少有一些树节点被渲染
        const treeItems = virtualTree.locator('.virtual-tree-item')
        const itemCount = await treeItems.count()
        await expect(itemCount).toBeGreaterThan(0)

        // 验证节点包含标签文本
        const firstItemLabel = treeItems.first().locator('.virtual-tree-label')
        await expect(firstItemLabel).toBeVisible()
        await expect(firstItemLabel).toContainText('节点')
    })

    // 产品展示页面测试
    test('产品展示页面应该显示所有产品', async ({ page }) => {
        await page.goto('/products')

        await expect(page.locator('h1')).toContainText('产品展示')
        await expect(page.locator('.product-card')).toHaveCount(6)

        // 验证第一个产品卡片包含基本信息
        const firstCard = page.locator('.product-card').first()
        await expect(firstCard.locator('h3')).toBeVisible()
        await expect(firstCard.locator('.product-price')).toBeVisible()
    })

    // 关于我们页面测试
    test('关于我们页面应该显示团队信息', async ({ page }) => {
        await page.goto('/about')

        await expect(page.locator('h1')).toContainText('关于我们')
        await expect(page.locator('.team-member')).toHaveCount(3)
        await expect(page.locator('.contact-item')).toHaveCount(3)
    })

    // 响应式设计测试
    test('应该支持移动端显示', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })

        await page.goto('/')
        await expect(page.locator('.hero-title')).toBeVisible()

        await page.goto('/components')
        await expect(page.locator('h1')).toBeVisible()
    })

    // 完整用户流程测试
    test('用户应该能够完整浏览网站', async ({ page }) => {
        // 从首页开始
        await page.goto('/')
        await expect(page.locator('.hero-title')).toBeVisible()

        // 点击查看组件库
        await page.getByRole('link', { name: '查看组件库' }).click()
        await expect(page).toHaveURL('/components')

        // 导航到产品
        await page.locator('.nav-links').getByRole('link', { name: '产品展示' }).click()
        await expect(page).toHaveURL('/products')

        // 返回首页
        await page.locator('.logo').click()
        await expect(page).toHaveURL('/')
    })
})
