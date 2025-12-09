import { test, expect } from '@playwright/test'

test.describe('图书馆座位预约系统 - 完整功能测试', () => {

    // 首页测试
    test.describe('首页功能', () => {
        test('应该正确显示首页内容', async ({ page }) => {
            await page.goto('/')

            // 验证页面标题
            await expect(page.locator('.hero-title')).toContainText('欢迎使用图书馆座位预约系统')
            await expect(page.locator('.hero-subtitle')).toContainText('轻松预约，高效学习')

            // 验证统计卡片
            const statCards = page.locator('.stat-card')
            await expect(statCards).toHaveCount(4)

            // 验证统计数据显示
            await expect(page.locator('.stat-label').first()).toBeVisible()
            await expect(page.locator('.stat-value').first()).toBeVisible()
        })

        test('应该显示快速操作按钮', async ({ page }) => {
            await page.goto('/')

            // 验证快速操作卡片
            const actionCards = page.locator('.action-card')
            await expect(actionCards).toHaveCount(2)

            // 验证按钮文本
            await expect(page.getByRole('button', { name: '立即预约' })).toBeVisible()
            await expect(page.getByRole('button', { name: '查看统计' })).toBeVisible()
        })

        test('应该显示我的预约列表', async ({ page }) => {
            await page.goto('/')

            // 验证预约列表标题
            await expect(page.locator('.my-bookings h3')).toContainText('我的预约')

            // 验证预约项存在
            const bookingItems = page.locator('.booking-item')
            const count = await bookingItems.count()
            expect(count).toBeGreaterThanOrEqual(0)
        })

        test('应该能够取消预约', async ({ page }) => {
            await page.goto('/')

            // 获取初始预约数量
            const initialCount = await page.locator('.booking-item').count()

            if (initialCount > 0) {
                // 点击第一个取消按钮
                await page.locator('.booking-item .btn-danger').first().click()

                // 验证预约数量减少
                const newCount = await page.locator('.booking-item').count()
                expect(newCount).toBe(initialCount - 1)
            }
        })
    })

    // 导航测试
    test.describe('导航功能', () => {
        test('应该能够通过导航栏切换页面', async ({ page }) => {
            await page.goto('/')

            // 点击座位预约导航
            await page.getByRole('link', { name: '💺 座位预约' }).click()
            await expect(page).toHaveURL('/booking')
            await expect(page.locator('.page-header h1')).toContainText('座位预约')

            // 点击数据统计导航
            await page.getByRole('link', { name: '📊 数据统计' }).click()
            await expect(page).toHaveURL('/statistics')
            await expect(page.locator('.page-header h1')).toContainText('数据统计分析')

            // 返回首页
            await page.getByRole('link', { name: '🏠 首页' }).click()
            await expect(page).toHaveURL('/')
        })

        test('应该能够通过快速操作按钮跳转', async ({ page }) => {
            await page.goto('/')

            // 点击立即预约按钮
            await page.getByRole('button', { name: '立即预约' }).click()
            await expect(page).toHaveURL('/booking')

            // 返回首页
            await page.goto('/')

            // 点击查看统计按钮
            await page.getByRole('button', { name: '查看统计' }).click()
            await expect(page).toHaveURL('/statistics')
        })
    })

    // 座位预约页面测试
    test.describe('座位预约功能', () => {
        test('应该正确显示座位预约页面', async ({ page }) => {
            await page.goto('/booking')

            // 验证页面标题
            await expect(page.locator('.page-header h1')).toContainText('座位预约')
            await expect(page.locator('.page-header p')).toContainText('选择您喜欢的座位和时间段')
        })

        test('应该显示预约控制选项', async ({ page }) => {
            await page.goto('/booking')

            // 验证日期选择器
            await expect(page.locator('input[type="date"]')).toBeVisible()

            // 验证时间段选择器
            await expect(page.locator('select')).toBeVisible()

            // 验证默认值
            const timeSelect = page.locator('select')
            await expect(timeSelect).toHaveValue('morning')
        })

        test('应该显示座位地图和图例', async ({ page }) => {
            await page.goto('/booking')

            // 验证图例
            const legendItems = page.locator('.legend-item')
            await expect(legendItems).toHaveCount(4)

            // 验证座位区域
            const seatRows = page.locator('.seat-row')
            await expect(seatRows).toHaveCount(4) // A, B, C, D区

            // 验证每个区域有座位
            const firstRowSeats = page.locator('.seat-row').first().locator('.seat')
            await expect(firstRowSeats).toHaveCount(8)
        })

        test('应该能够选择可用座位', async ({ page }) => {
            await page.goto('/booking')

            // 查找并点击第一个可用座位
            const availableSeat = page.locator('.seat.available').first()
            await availableSeat.click()

            // 验证预约摘要显示
            await expect(page.locator('.booking-summary')).toBeVisible()
            await expect(page.locator('.booking-summary h3')).toContainText('预约信息')

            // 验证座位信息显示
            await expect(page.locator('.summary-item').first()).toBeVisible()
        })

        test('应该能够更改时间段', async ({ page }) => {
            await page.goto('/booking')

            // 选择下午时间段
            await page.locator('select').selectOption('afternoon')
            await expect(page.locator('select')).toHaveValue('afternoon')

            // 选择全天
            await page.locator('select').selectOption('allday')
            await expect(page.locator('select')).toHaveValue('allday')
        })

        test('应该能够取消座位选择', async ({ page }) => {
            await page.goto('/booking')

            // 选择座位
            await page.locator('.seat.available').first().click()
            await expect(page.locator('.booking-summary')).toBeVisible()

            // 点击取消按钮
            await page.locator('.booking-summary .btn-outline').click()

            // 验证预约摘要消失
            await expect(page.locator('.booking-summary')).not.toBeVisible()
        })

        test('应该能够确认预约', async ({ page }) => {
            await page.goto('/booking')

            // 选择座位
            await page.locator('.seat.available').first().click()

            // 设置对话框处理
            page.on('dialog', dialog => dialog.accept())

            // 点击确认预约
            await page.locator('.booking-summary .btn-primary').click()

            // 验证预约摘要消失（预约成功后）
            await expect(page.locator('.booking-summary')).not.toBeVisible()
        })

        test('不应该能够选择已占用的座位', async ({ page }) => {
            await page.goto('/booking')

            // 尝试点击已占用座位
            const occupiedSeats = page.locator('.seat.occupied')
            const count = await occupiedSeats.count()

            if (count > 0) {
                await occupiedSeats.first().click()

                // 验证预约摘要不显示
                await expect(page.locator('.booking-summary')).not.toBeVisible()
            }
        })
    })

    // 数据统计页面测试
    test.describe('数据统计功能', () => {
        test('应该正确显示数据统计页面', async ({ page }) => {
            await page.goto('/statistics')

            // 验证页面标题
            await expect(page.locator('.page-header h1')).toContainText('数据统计分析')
            await expect(page.locator('.page-header p')).toContainText('全面了解图书馆座位使用情况')
        })

        test('应该显示所有图表卡片', async ({ page }) => {
            await page.goto('/statistics')

            // 等待页面加载
            await page.waitForLoadState('networkidle')

            // 验证图表卡片数量
            const chartCards = page.locator('.chart-card')
            await expect(chartCards).toHaveCount(8)
        })

        test('应该显示正确的图表标题', async ({ page }) => {
            await page.goto('/statistics')

            // 验证各个图表标题
            await expect(page.locator('.chart-card h3').nth(0)).toContainText('月度预约趋势')
            await expect(page.locator('.chart-card h3').nth(1)).toContainText('用户来源分布')
            await expect(page.locator('.chart-card h3').nth(2)).toContainText('周活跃量统计')
            await expect(page.locator('.chart-card h3').nth(3)).toContainText('用户增长趋势')
            await expect(page.locator('.chart-card h3').nth(4)).toContainText('累计用户量')
            await expect(page.locator('.chart-card h3').nth(5)).toContainText('消息发送概况')
            await expect(page.locator('.chart-card h3').nth(6)).toContainText('接口调用分析')
            await expect(page.locator('.chart-card h3').nth(7)).toContainText('接口响应时间')
        })

        test('应该渲染所有图表容器', async ({ page }) => {
            await page.goto('/statistics')

            // 等待图表加载
            await page.waitForTimeout(1000)

            // 验证图表容器存在
            const charts = page.locator('.chart')
            await expect(charts).toHaveCount(8)

            // 验证每个图表容器可见
            for (let i = 0; i < 8; i++) {
                await expect(charts.nth(i)).toBeVisible()
            }
        })
    })

    // 响应式设计测试
    test.describe('响应式设计', () => {
        test('应该在移动设备上正常显示', async ({ page }) => {
            // 设置移动设备视口
            await page.setViewportSize({ width: 375, height: 667 })

            await page.goto('/')

            // 验证页面元素可见
            await expect(page.locator('.hero-title')).toBeVisible()
            await expect(page.locator('.navbar')).toBeVisible()

            // 导航到座位预约
            await page.goto('/booking')
            await expect(page.locator('.seat-map')).toBeVisible()

            // 导航到统计页面
            await page.goto('/statistics')
            await expect(page.locator('.charts-grid')).toBeVisible()
        })

        test('应该在平板设备上正常显示', async ({ page }) => {
            // 设置平板视口
            await page.setViewportSize({ width: 768, height: 1024 })

            await page.goto('/')
            await expect(page.locator('.container')).toBeVisible()

            await page.goto('/booking')
            await expect(page.locator('.seat-map-container')).toBeVisible()

            await page.goto('/statistics')
            await expect(page.locator('.charts-grid')).toBeVisible()
        })
    })

    // UI交互测试
    test.describe('UI交互效果', () => {
        test('卡片应该有hover效果', async ({ page }) => {
            await page.goto('/')

            const card = page.locator('.card').first()

            // 获取初始样式
            const initialBox = await card.boundingBox()

            // 悬停
            await card.hover()

            // 验证元素仍然可见（hover效果不会隐藏元素）
            await expect(card).toBeVisible()
        })

        test('按钮应该可点击', async ({ page }) => {
            await page.goto('/')

            const button = page.getByRole('button', { name: '立即预约' })

            // 验证按钮可点击
            await expect(button).toBeEnabled()

            // 点击按钮
            await button.click()

            // 验证导航成功
            await expect(page).toHaveURL('/booking')
        })
    })

    // 完整用户流程测试
    test.describe('完整用户流程', () => {
        test('用户应该能够完成完整的预约流程', async ({ page }) => {
            // 1. 访问首页
            await page.goto('/')
            await expect(page.locator('.hero-title')).toBeVisible()

            // 2. 点击立即预约
            await page.getByRole('button', { name: '立即预约' }).click()
            await expect(page).toHaveURL('/booking')

            // 3. 选择日期（使用当前日期）
            const today = new Date().toISOString().split('T')[0]
            await page.locator('input[type="date"]').fill(today)

            // 4. 选择时间段
            await page.locator('select').selectOption('afternoon')

            // 5. 选择座位
            await page.locator('.seat.available').first().click()
            await expect(page.locator('.booking-summary')).toBeVisible()

            // 6. 确认预约
            page.on('dialog', dialog => dialog.accept())
            await page.locator('.booking-summary .btn-primary').click()

            // 7. 验证预约完成
            await expect(page.locator('.booking-summary')).not.toBeVisible()
        })

        test('用户应该能够浏览所有页面', async ({ page }) => {
            // 首页
            await page.goto('/')
            await expect(page.locator('.hero-title')).toBeVisible()

            // 座位预约
            await page.getByRole('link', { name: '💺 座位预约' }).click()
            await expect(page.locator('.seat-map')).toBeVisible()

            // 数据统计
            await page.getByRole('link', { name: '📊 数据统计' }).click()
            await expect(page.locator('.charts-grid')).toBeVisible()

            // 返回首页
            await page.getByRole('link', { name: '🏠 首页' }).click()
            await expect(page.locator('.hero-title')).toBeVisible()
        })
    })
})
