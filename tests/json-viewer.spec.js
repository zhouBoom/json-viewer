import { test, expect } from '@playwright/test';

test('页面加载成功并显示标题', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 检查页面标题
  await expect(page).toHaveTitle('json-viewer');

  // 检查主标题 - Updated to match new UI
  await expect(page.getByText('现代化的 JSON 数据可视化工具')).toBeVisible();
});

test('检查所有视图按钮存在且可见', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 检查树状视图按钮
  await expect(page.getByText('树状视图')).toBeVisible();

  // 检查列表视图按钮
  await expect(page.getByText('列表视图')).toBeVisible();

  // 检查编辑器视图按钮 - Updated text
  await expect(page.getByText('编辑器', { exact: true })).toBeVisible();
});

test('检查上传按钮存在且可见', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 检查上传按钮 - Updated text
  await expect(page.getByText('上传文件', { exact: true })).toBeVisible();
  await expect(page.getByText('选择文件')).toBeVisible();
});

test('检查空状态显示', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 检查空状态提示 - Updated text
  await expect(page.getByText('开始使用')).toBeVisible();
  await expect(page.getByText('上传 JSON 文件')).toBeVisible();
});

test('上传JSON文件后数据正确显示', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 创建测试用的JSON数据
  const testData = {
    name: '测试用户',
    age: 25,
    hobbies: ['阅读', '编程', '旅行'],
    address: {
      city: '北京',
      country: '中国'
    }
  };

  // 创建一个临时的JSON文件
  const fileContent = JSON.stringify(testData, null, 2);
  const buffer = Buffer.from(fileContent, 'utf-8');

  // 找到文件上传输入框并上传文件
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles({
    name: 'test.json',
    mimeType: 'application/json',
    buffer: buffer
  });

  // 等待树状视图加载
  await page.waitForSelector('.tree-view', { timeout: 5000 });

  // 展开根节点以查看数据
  const rootNode = page.locator('.tree-node .node-header').first();
  await rootNode.click();

  // 等待一下让节点展开
  await page.waitForTimeout(500);

  // 验证数据显示在树状视图中
  await expect(page.getByText('name:')).toBeVisible();
  await expect(page.locator('.value-string').filter({ hasText: '测试用户' })).toBeVisible();
  await expect(page.getByText('age:')).toBeVisible();
  await expect(page.locator('.value-number').filter({ hasText: '25' })).toBeVisible();

  // 验证空状态不再显示
  await expect(page.getByText('开始使用')).not.toBeVisible();
});