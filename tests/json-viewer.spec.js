import { test, expect } from '@playwright/test';

test('页面加载成功并显示标题', async ({ page }) => {
  await page.goto('http://localhost:5176');

  // 检查页面标题
  await expect(page).toHaveTitle('json-viewer');

  // 检查主标题 - Updated to match new UI
  await expect(page.getByText('现代化的 JSON 数据可视化工具')).toBeVisible();
});

test('检查所有视图按钮存在且可见', async ({ page }) => {
  await page.goto('http://localhost:5176');

  // 检查树状视图按钮
  await expect(page.getByText('树状视图')).toBeVisible();

  // 检查列表视图按钮
  await expect(page.getByText('列表视图')).toBeVisible();

  // 检查编辑器视图按钮 - Updated text
  await expect(page.getByText('编辑器', { exact: true })).toBeVisible();
});

test('检查上传按钮存在且可见', async ({ page }) => {
  await page.goto('http://localhost:5176');

  // 检查上传按钮 - Updated text
  await expect(page.getByText('上传文件', { exact: true })).toBeVisible();
  await expect(page.getByText('选择文件')).toBeVisible();
});

test('检查空状态显示', async ({ page }) => {
  await page.goto('http://localhost:5176');

  // 检查空状态提示 - Updated text
  await expect(page.getByText('开始使用')).toBeVisible();
  await expect(page.getByText('上传 JSON 文件')).toBeVisible();
});