<template>
  <div class="home-page">
    <div class="container">
      <div class="hero-section fade-in">
        <h1 class="hero-title">欢迎使用图书馆座位预约系统</h1>
        <p class="hero-subtitle">轻松预约，高效学习</p>
      </div>

      <div class="stats-grid grid grid-4">
        <div class="stat-card card fade-in" style="animation-delay: 0.1s">
          <div class="stat-icon">📅</div>
          <div class="stat-value">{{ todayBookings }}</div>
          <div class="stat-label">今日预约</div>
        </div>
        <div class="stat-card card fade-in" style="animation-delay: 0.2s">
          <div class="stat-icon">💺</div>
          <div class="stat-value">{{ availableSeats }}</div>
          <div class="stat-label">可用座位</div>
        </div>
        <div class="stat-card card fade-in" style="animation-delay: 0.3s">
          <div class="stat-icon">📈</div>
          <div class="stat-value">{{ usageRate }}%</div>
          <div class="stat-label">座位使用率</div>
        </div>
        <div class="stat-card card fade-in" style="animation-delay: 0.4s">
          <div class="stat-icon">👥</div>
          <div class="stat-value">{{ totalUsers }}</div>
          <div class="stat-label">总用户数</div>
        </div>
      </div>

      <div class="quick-actions grid grid-2">
        <div class="action-card card fade-in" style="animation-delay: 0.5s">
          <h3>🎯 快速预约</h3>
          <p>选择您喜欢的座位，立即开始学习</p>
          <router-link to="/booking">
            <button class="btn btn-primary">立即预约</button>
          </router-link>
        </div>
        <div class="action-card card fade-in" style="animation-delay: 0.6s">
          <h3>📊 数据分析</h3>
          <p>查看详细的使用统计和趋势分析</p>
          <router-link to="/statistics">
            <button class="btn btn-success">查看统计</button>
          </router-link>
        </div>
      </div>

      <div class="my-bookings card fade-in" style="animation-delay: 0.7s">
        <h3>📋 我的预约</h3>
        <div v-if="myBookings.length > 0" class="booking-list">
          <div v-for="booking in myBookings" :key="booking.id" class="booking-item">
            <div class="booking-info">
              <span class="seat-number">座位 {{ booking.seat }}</span>
              <span class="booking-time">{{ booking.date }} {{ booking.time }}</span>
            </div>
            <button class="btn btn-danger btn-sm" @click="cancelBooking(booking.id)">取消</button>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>暂无预约记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { bookingStore } from '../store.js'

const todayBookings = ref(156)
const availableSeats = ref(48)
const usageRate = ref(76)
const totalUsers = ref(2845)

// 从store读取预约记录
const myBookings = ref([])

// 加载预约记录
const loadBookings = () => {
  myBookings.value = bookingStore.getBookings()
}

// 组件挂载时加载
onMounted(() => {
  loadBookings()
})

const cancelBooking = (id) => {
  bookingStore.removeBooking(id)
  loadBookings() // 重新加载预约列表
  availableSeats.value++
}
</script>

<style scoped>
.home-page {
  padding: 40px 0;
  min-height: calc(100vh - 60px);
}

.hero-section {
  text-align: center;
  margin-bottom: 48px;
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
}

.stats-grid {
  margin-bottom: 32px;
}

.stat-card {
  text-align: center;
  padding: 32px 24px;
}

.stat-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.quick-actions {
  margin-bottom: 32px;
}

.action-card {
  text-align: center;
  padding: 40px 32px;
}

.action-card h3 {
  font-size: 24px;
  margin-bottom: 12px;
}

.action-card p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.my-bookings h3 {
  margin-bottom: 24px;
  font-size: 20px;
}

.booking-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05));
  border-radius: var(--radius-sm);
  border-left: 4px solid var(--primary-color);
}

.booking-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.seat-number {
  font-weight: 600;
  font-size: 16px;
}

.booking-time {
  font-size: 14px;
  color: var(--text-secondary);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .stat-card {
    padding: 24px 16px;
  }
  
  .stat-icon {
    font-size: 36px;
  }
  
  .stat-value {
    font-size: 28px;
  }
}
</style>
