<template>
  <div class="product-page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="商品详情"
      left-arrow
      @click-left="router.back()"
      fixed
    />
    
    <div class="content" style="margin-top: 46px; padding-bottom: 60px;">
      <!-- 商品图片轮播 -->
      <van-swipe class="product-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in product.images" :key="index">
          <img :src="image" :alt="product.title" class="swipe-image" />
        </van-swipe-item>
      </van-swipe>

      <!-- 商品信息 -->
      <div class="product-info-card">
        <div class="price-section">
          <span class="current-price">
            <span class="price-symbol">¥</span>
            <span class="price-value">{{ product.price }}</span>
          </span>
          <span class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
          <van-tag type="danger" size="large" v-if="product.discount">{{ product.discount }}</van-tag>
        </div>
        
        <div class="product-title">{{ product.title }}</div>
        <div class="product-subtitle">{{ product.subtitle }}</div>
        
        <div class="product-tags">
          <van-tag type="primary" plain v-for="tag in product.tags" :key="tag">{{ tag }}</van-tag>
        </div>
      </div>

      <!-- 服务保障 -->
      <div class="service-card">
        <van-cell-group inset>
          <van-cell title="7天无理由退货" icon="shield-o" />
          <van-cell title="15天免费换货" icon="exchange" />
          <van-cell title="1年质保" icon="certificate" />
          <van-cell title="顺丰包邮" icon="logistics" />
        </van-cell-group>
      </div>

      <!-- 商品详情 -->
      <div class="detail-card">
        <div class="detail-title">商品详情</div>
        <div class="detail-content">
          <div class="detail-item" v-for="(value, key) in product.specs" :key="key">
            <span class="detail-label">{{ key }}</span>
            <span class="detail-value">{{ value }}</span>
          </div>
        </div>
        
        <div class="detail-desc">
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="goods-action-bar">
      <div class="action-icons">
        <div class="action-icon" @click="showToast('客服功能开发中')">
          <van-icon name="chat-o" />
          <span>客服</span>
        </div>
        <div class="action-icon" @click="goToCart">
          <van-icon name="cart-o" :badge="cartCount > 0 ? cartCount : ''" />
          <span>购物车</span>
        </div>
        <div class="action-icon" @click="toggleFavorite">
          <van-icon :name="isFavorite ? 'star' : 'star-o'" :color="isFavorite ? '#FF6700' : ''" />
          <span>{{ isFavorite ? '已收藏' : '收藏' }}</span>
        </div>
      </div>
      <div class="action-buttons">
        <button class="btn-add-cart" @click="addToCart">加入购物车</button>
        <button class="btn-buy-now" @click="buyNow">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'

const router = useRouter()
const route = useRoute()

// 页面加载时重置滚动位置
onMounted(() => {
  window.scrollTo(0, 0)
})

const cartCount = ref(0)
const isFavorite = ref(false)

// 商品数据（实际应该从 API 获取）
const product = ref({
  id: route.params.id,
  title: '小米14 Ultra',
  subtitle: '徕卡光学全焦段四摄 | 骁龙8 Gen3',
  price: 6499,
  originalPrice: 6999,
  discount: '限时优惠',
  images: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=800&fit=crop'
  ],
  tags: ['新品', '热卖', '顺丰包邮'],
  specs: {
    '屏幕': '6.73英寸 2K AMOLED',
    '处理器': '骁龙8 Gen3',
    '内存': '12GB/16GB',
    '存储': '256GB/512GB/1TB',
    '相机': '5000万主摄 + 5000万超广角 + 5000万长焦',
    '电池': '5000mAh',
    '充电': '90W有线 + 80W无线'
  },
  description: '小米14 Ultra搭载徕卡Summilux镜头，拥有全焦段四摄系统，配备骁龙8 Gen3旗舰处理器，支持90W有线快充和80W无线快充，带来专业级影像体验和极致性能表现。'
})

// 加入购物车
const addToCart = () => {
  cartCount.value++
  showSuccessToast('已加入购物车')
}

// 立即购买
const buyNow = () => {
  showToast('跳转到结算页面')
}

// 收藏
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  if (isFavorite.value) {
    showSuccessToast('收藏成功')
  } else {
    showSuccessToast('已取消收藏')
  }
}

// 跳转到购物车
const goToCart = () => {
  router.push('/cart')
}
</script>

<style scoped>
.product-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 商品图片轮播 */
.product-swipe {
  height: 375px;
  background: white;
}

.swipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 商品信息卡片 */
.product-info-card {
  background: white;
  padding: 16px;
  margin-bottom: 12px;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}

.current-price {
  color: #FF6700;
  font-weight: 700;
}

.price-symbol {
  font-size: 18px;
}

.price-value {
  font-size: 32px;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.product-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}

.product-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
}

.product-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.product-tags :deep(.van-tag) {
  border-radius: 4px;
}

/* 服务保障 */
.service-card {
  margin-bottom: 12px;
}

.service-card :deep(.van-cell) {
  padding: 12px 16px;
}

.service-card :deep(.van-cell__left-icon) {
  color: #FF6700;
  font-size: 18px;
}

/* 商品详情 */
.detail-card {
  background: white;
  padding: 16px;
  margin-bottom: 12px;
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #FF6700;
  display: inline-block;
}

.detail-content {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  width: 80px;
  color: #999;
  font-size: 14px;
  flex-shrink: 0;
}

.detail-value {
  flex: 1;
  color: #333;
  font-size: 14px;
}

.detail-desc {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  line-height: 1.6;
  color: #666;
  font-size: 14px;
}

/* 返回按钮颜色 */
.product-page :deep(.van-nav-bar__arrow) {
  color: white;
}

/* 底部操作栏 */
.goods-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
  padding: 8px;
  z-index: 100;
}

.action-icons {
  display: flex;
  gap: 8px;
  padding: 0 4px;
}

.action-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 45px;
}

.action-icon:active {
  transform: scale(0.95);
}

.action-icon .van-icon {
  font-size: 20px;
  color: #333;
}

.action-icon span {
  font-size: 11px;
  color: #666;
  white-space: nowrap;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-left: auto;
  flex: 1;
}

.btn-add-cart,
.btn-buy-now {
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add-cart {
  background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
  color: white;
}

.btn-add-cart:hover {
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
}

.btn-add-cart:active {
  transform: scale(0.98);
}

.btn-buy-now {
  background: linear-gradient(135deg, #FF6700 0%, #e65a00 100%);
  color: white;
}

.btn-buy-now:hover {
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}

.btn-buy-now:active {
  transform: scale(0.98);
}

/* PC端优化 */
@media (min-width: 768px) {
  .product-page {
    position: relative;
  }
  
  .content {
    padding-bottom: 100px !important;
  }
  
  .product-swipe {
    height: 450px;
  }
  
  /* PC端底部操作栏 */
  .goods-action-bar {
    max-width: 1200px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    border-radius: 0;
  }
  
  .action-icons {
    gap: 24px;
    padding: 0 16px;
  }
  
  .action-buttons {
    justify-content: flex-end;
    gap: 12px;
  }
  
  .action-icon .van-icon {
    font-size: 22px;
  }
  
  .action-icon span {
    font-size: 12px;
  }
  
  .btn-add-cart,
  .btn-buy-now {
    height: 44px;
    font-size: 15px;
    max-width: 200px;
  }
}



</style>
