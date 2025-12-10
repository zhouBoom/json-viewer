<template>
  <div class="user-page">
    <!-- 顶部导航 -->
    <van-nav-bar title="我的" fixed />
    
    <div class="content" style="margin-top: 46px;">
      <!-- 用户信息卡片 -->
      <div class="user-info-card">
        <div class="user-header" @click="showToast('个人信息功能开发中')">
          <van-image
            round
            width="60"
            height="60"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="avatar"
          />
          <div class="user-details">
            <div class="username">小米用户</div>
            <div class="user-id">ID: 123456789</div>
          </div>
          <van-icon name="arrow" class="arrow-icon" />
        </div>
        
        <!-- 会员信息 -->
        <div class="vip-section">
          <div class="vip-badge">
            <van-icon name="vip-card" />
            <span>小米会员</span>
          </div>
          <div class="vip-info">
            <span>积分: 2580</span>
            <span class="divider">|</span>
            <span>优惠券: 5张</span>
          </div>
        </div>
      </div>

      <!-- 订单入口 -->
      <div class="order-section">
        <div class="section-header">
          <span class="section-title">我的订单</span>
          <div class="view-all" @click="showToast('查看全部订单')">
            <span>查看全部</span>
            <van-icon name="arrow" />
          </div>
        </div>
        
        <van-grid :column-num="5" :border="false" class="order-grid">
          <van-grid-item
            v-for="order in orderTypes"
            :key="order.type"
            :icon="order.icon"
            :text="order.text"
            :badge="order.badge"
            @click="handleOrderClick(order.type)"
          />
        </van-grid>
      </div>

      <!-- 功能列表 -->
      <div class="function-section">
        <van-cell-group inset>
          <van-cell
            v-for="item in functionList"
            :key="item.title"
            :title="item.title"
            :icon="item.icon"
            is-link
            @click="handleFunctionClick(item.type)"
          >
            <template #icon>
              <van-icon :name="item.icon" class="cell-icon" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 服务列表 -->
      <div class="service-section">
        <van-cell-group inset>
          <van-cell
            v-for="item in serviceList"
            :key="item.title"
            :title="item.title"
            :icon="item.icon"
            is-link
            @click="handleServiceClick(item.type)"
          >
            <template #icon>
              <van-icon :name="item.icon" class="cell-icon" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 退出登录 -->
      <div class="logout-section">
        <van-button block round type="danger" plain @click="handleLogout">
          退出登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast, showConfirmDialog } from 'vant'

// 订单类型
const orderTypes = ref([
  { type: 'pay', icon: 'pending-payment', text: '待付款', badge: 2 },
  { type: 'ship', icon: 'tosend', text: '待发货', badge: 0 },
  { type: 'receive', icon: 'logistics', text: '待收货', badge: 1 },
  { type: 'comment', icon: 'comment-o', text: '待评价', badge: 3 },
  { type: 'service', icon: 'after-sale', text: '售后', badge: 1 }
])

// 功能列表
const functionList = ref([
  { title: '收货地址', icon: 'location-o', type: 'address' },
  { title: '我的收藏', icon: 'star-o', type: 'favorite' },
  { title: '浏览记录', icon: 'browsing-history-o', type: 'history' },
  { title: '优惠券', icon: 'coupon-o', type: 'coupon' }
])

// 服务列表
const serviceList = ref([
  { title: '在线客服', icon: 'service-o', type: 'service' },
  { title: '帮助中心', icon: 'question-o', type: 'help' },
  { title: '意见反馈', icon: 'comment-o', type: 'feedback' },
  { title: '关于我们', icon: 'info-o', type: 'about' },
  { title: '设置', icon: 'setting-o', type: 'setting' }
])

// 处理订单点击
const handleOrderClick = (type) => {
  const typeMap = {
    pay: '待付款',
    ship: '待发货',
    receive: '待收货',
    comment: '待评价',
    service: '售后服务'
  }
  showToast(`查看${typeMap[type]}订单`)
}

// 处理功能点击
const handleFunctionClick = (type) => {
  const typeMap = {
    address: '收货地址',
    favorite: '我的收藏',
    history: '浏览记录',
    coupon: '优惠券'
  }
  showToast(`${typeMap[type]}功能开发中`)
}

// 处理服务点击
const handleServiceClick = (type) => {
  const typeMap = {
    service: '在线客服',
    help: '帮助中心',
    feedback: '意见反馈',
    about: '关于我们',
    setting: '设置'
  }
  showToast(`${typeMap[type]}功能开发中`)
}

// 退出登录
const handleLogout = () => {
  showConfirmDialog({
    title: '提示',
    message: '确定要退出登录吗？'
  }).then(() => {
    showToast('已退出登录')
  }).catch(() => {
    // 取消
  })
}
</script>

<style scoped>
.user-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 50px;
}

.content {
  padding: 12px;
}

/* 用户信息卡片 */
.user-info-card {
  background: linear-gradient(135deg, #FF6700 0%, #FF8C00 100%);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.2);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.avatar {
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-details {
  flex: 1;
}

.username {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.user-id {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.arrow-icon {
  color: white;
  font-size: 18px;
}

.vip-section {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vip-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.vip-info {
  display: flex;
  gap: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.divider {
  color: rgba(255, 255, 255, 0.5);
}

/* 订单区域 */
.order-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #999;
  cursor: pointer;
}

.order-grid :deep(.van-grid-item__content) {
  padding: 16px 8px;
}

.order-grid :deep(.van-grid-item__icon) {
  font-size: 24px;
  color: #FF6700;
}

.order-grid :deep(.van-grid-item__text) {
  margin-top: 8px;
  color: #666;
  font-size: 12px;
}

.order-grid :deep(.van-badge) {
  background-color: #FF6700;
}

/* 功能和服务区域 */
.function-section,
.service-section {
  margin-bottom: 12px;
}

.cell-icon {
  font-size: 20px;
  color: #FF6700;
  margin-right: 12px;
}

.function-section :deep(.van-cell),
.service-section :deep(.van-cell) {
  padding: 14px 16px;
}

.function-section :deep(.van-cell__title),
.service-section :deep(.van-cell__title) {
  font-size: 14px;
  color: #333;
}

/* 退出登录 */
.logout-section {
  margin-top: 20px;
  padding: 0 12px;
}

.logout-section :deep(.van-button) {
  border-color: #FF6700;
  color: #FF6700;
  font-weight: 500;
}

.logout-section :deep(.van-button:active) {
  background-color: #fff5f0;
}

/* PC端优化 */
@media (min-width: 768px) {
  .logout-section .van-button {
    max-width: 400px;
    margin: 0 auto;
  }
}

</style>
