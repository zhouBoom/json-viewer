<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <van-nav-bar title="小米商城" fixed />
    
    <div class="content" style="margin-top: 46px;">
      <!-- 轮播图 -->
      <van-swipe class="banner-swipe" :autoplay="3000" indicator-color="#FF6700">
        <van-swipe-item v-for="(banner, index) in banners" :key="index">
          <img :src="banner.image" :alt="banner.title" class="banner-image" />
        </van-swipe-item>
      </van-swipe>

      <!-- 分类入口 -->
      <div class="category-grid">
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            v-for="category in categories"
            :key="category.id"
            :icon="category.icon"
            :text="category.name"
            @click="goToCategory(category.id)"
          />
        </van-grid>
      </div>

      <!-- 商品推荐 -->
      <div class="recommend-section">
        <div class="section-title">
          <span class="title-text">热门推荐</span>
          <van-icon name="fire" color="#FF6700" />
        </div>
        
        <div class="product-list">
          <div
            v-for="product in recommendProducts"
            :key="product.id"
            class="product-card fade-in"
            @click="goToProduct(product.id)"
          >
            <img :src="product.image" :alt="product.title" class="product-image" />
            <div class="product-info">
              <div class="product-title">{{ product.title }}</div>
              <div class="product-desc">{{ product.desc }}</div>
              <div class="product-footer">
                <span class="product-price">
                  <span class="price-symbol">¥</span>
                  <span class="price-integer">{{ product.price }}</span>
                </span>
                <van-tag type="danger" size="medium" v-if="product.hot">热卖</van-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 轮播图数据
const banners = ref([
  {
    title: '小米14 Ultra',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop'
  },
  {
    title: 'Redmi Note 13',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=400&fit=crop'
  },
  {
    title: '小米手环8',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop'
  }
])

// 分类数据
const categories = ref([
  { id: 1, name: '手机', icon: 'phone' },
  { id: 2, name: '电视', icon: 'tv-o' },
  { id: 3, name: '笔记本', icon: 'desktop-o' },
  { id: 4, name: '家电', icon: 'home-o' },
  { id: 5, name: '配件', icon: 'bag-o' },
  { id: 6, name: '耳机', icon: 'music-o' },
  { id: 7, name: '路由器', icon: 'cluster-o' },
  { id: 8, name: '智能', icon: 'fire' },
  { id: 9, name: '电源', icon: 'fire-o' },
  { id: 10, name: '更多', icon: 'ellipsis' }
])

// 推荐商品数据
const recommendProducts = ref([
  {
    id: 1,
    title: '小米14 Ultra',
    desc: '徕卡光学全焦段四摄',
    price: 6499,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    hot: true
  },
  {
    id: 2,
    title: 'Redmi K70 Pro',
    desc: '2K 高光屏 | 第三代骁龙8',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    hot: true
  },
  {
    id: 3,
    title: '小米电视 S Pro 85英寸',
    desc: '4K 120Hz | 金属全面屏',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    hot: false
  },
  {
    id: 4,
    title: '小米笔记本 Pro 14',
    desc: 'Ultra 5 125H | 2.8K 120Hz',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    hot: false
  },
  {
    id: 5,
    title: '小米手环8',
    desc: '大屏长续航 | 150+运动模式',
    price: 239,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    hot: true
  },
  {
    id: 6,
    title: '小米 Buds 5',
    desc: '主动降噪 | 无线充电',
    price: 599,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    hot: false
  }
])

// 跳转到分类页
const goToCategory = (categoryId) => {
  router.push(`/category?id=${categoryId}`)
}

// 跳转到商品详情
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<style scoped>
.home-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 50px;
}

.content {
  padding-bottom: 20px;
}

/* 轮播图 */
.banner-swipe {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 分类网格 */
.category-grid {
  background: white;
  margin: 12px;
  border-radius: 12px;
  padding: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.category-grid :deep(.van-grid-item__content) {
  padding: 16px 8px;
  cursor: pointer;
}

.category-grid :deep(.van-grid-item__icon) {
  font-size: 28px;
  color: #FF6700;
}

.category-grid :deep(.van-grid-item__text) {
  margin-top: 8px;
  color: #333;
  font-size: 13px;
}

/* 推荐区域 */
.recommend-section {
  margin: 12px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
  border-radius: 12px 12px 0 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.title-text {
  background: linear-gradient(135deg, #FF6700 0%, #e65a00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 商品列表 */
.product-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.product-card {
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:active {
  transform: scale(0.96);
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: white;
}

.product-info {
  padding: 12px;
}

.product-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  color: #FF6700;
  font-weight: 600;
}

.price-symbol {
  font-size: 12px;
}

.price-integer {
  font-size: 18px;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.4s ease;
}

/* PC端优化 */
@media (min-width: 768px) {
  .banner-swipe {
    height: 300px;
    margin: 0 20px;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .category-grid {
    margin: 20px;
  }
  
  .recommend-section {
    margin: 20px;
  }
  
  .product-list {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 16px;
  }
  
  .product-image {
    height: 200px;
  }
  
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}

</style>
