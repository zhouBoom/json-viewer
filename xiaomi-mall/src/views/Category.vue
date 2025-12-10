<template>
  <div class="category-page">
    <!-- 顶部导航 -->
    <van-nav-bar title="商品分类" fixed />
    
    <div class="content" style="margin-top: 46px;">
      <div class="category-container">
        <!-- 左侧分类列表 -->
        <van-sidebar v-model="activeCategory" class="category-sidebar">
          <van-sidebar-item
            v-for="category in categories"
            :key="category.id"
            :title="category.name"
          />
        </van-sidebar>

        <!-- 右侧商品列表 -->
        <div class="products-container">
          <div class="category-banner">
            <img :src="currentCategory.banner" :alt="currentCategory.name" />
          </div>
          
          <div class="products-grid">
            <div
              v-for="product in currentProducts"
              :key="product.id"
              class="product-item"
              @click="goToProduct(product.id)"
            >
              <img :src="product.image" :alt="product.title" class="product-img" />
              <div class="product-name">{{ product.title }}</div>
              <div class="product-price">¥{{ product.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeCategory = ref(0)

// 分类数据
const categories = ref([
  { id: 1, name: '手机通讯', banner: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=240&fit=crop' },
  { id: 2, name: '电视影音', banner: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=240&fit=crop' },
  { id: 3, name: '笔记本', banner: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=240&fit=crop' },
  { id: 4, name: '家用电器', banner: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=240&fit=crop' },
  { id: 5, name: '智能穿戴', banner: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=240&fit=crop' },
  { id: 6, name: '耳机音箱', banner: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=240&fit=crop' }
])

// 商品数据
const productsData = ref({
  1: [
    { id: 1, title: '小米14 Ultra', price: 6499, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
    { id: 2, title: 'Redmi K70 Pro', price: 3299, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop' },
    { id: 3, title: '小米14', price: 3999, image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop' },
    { id: 4, title: 'Redmi Note 13', price: 1299, image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop' },
    { id: 5, title: '小米13 Ultra', price: 5999, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop' },
    { id: 6, title: 'Redmi K60', price: 2499, image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop' }
  ],
  2: [
    { id: 7, title: '小米电视 S Pro 85"', price: 7999, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop' },
    { id: 8, title: 'Redmi 智能电视 X65', price: 2999, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop' },
    { id: 9, title: '小米电视 6 55"', price: 2499, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=400&fit=crop' },
    { id: 10, title: '小米投影仪 2S', price: 3299, image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop' }
  ],
  3: [
    { id: 11, title: '小米笔记本 Pro 14', price: 5499, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
    { id: 12, title: 'Redmi Book Pro 15', price: 4299, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop' },
    { id: 13, title: '小米笔记本 Air 13', price: 3999, image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop' }
  ],
  4: [
    { id: 14, title: '米家扫地机器人', price: 1999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
    { id: 15, title: '小米空气净化器', price: 899, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop' },
    { id: 16, title: '米家电饭煲', price: 399, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop' }
  ],
  5: [
    { id: 17, title: '小米手环8', price: 239, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
    { id: 18, title: '小米手表 S3', price: 1299, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    { id: 19, title: 'Redmi Watch 3', price: 399, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop' }
  ],
  6: [
    { id: 20, title: '小米 Buds 5', price: 599, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop' },
    { id: 21, title: '小米音箱 Pro', price: 299, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
    { id: 22, title: 'Redmi Buds 4', price: 199, image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop' }
  ]
})

// 当前分类
const currentCategory = computed(() => categories.value[activeCategory.value])

// 当前分类的商品
const currentProducts = computed(() => {
  const categoryId = categories.value[activeCategory.value].id
  return productsData.value[categoryId] || []
})

// 跳转到商品详情
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<style scoped>
.category-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 50px;
}

.content {
  height: calc(100vh - 96px);
  overflow: hidden;
}

.category-container {
  display: flex;
  height: 100%;
}

/* 左侧分类 */
.category-sidebar {
  width: 90px;
  flex-shrink: 0;
}

.category-sidebar :deep(.van-sidebar-item) {
  padding: 20px 8px;
  font-size: 13px;
}

.category-sidebar :deep(.van-sidebar-item--select) {
  background: linear-gradient(90deg, #fff5f0 0%, #ffffff 100%);
  color: #FF6700;
  font-weight: 600;
  border-left: 3px solid #FF6700;
}

.category-sidebar :deep(.van-sidebar-item--select::before) {
  display: none;
}


/* 右侧商品区域 */
.products-container {
  flex: 1;
  overflow-y: auto;
  background: white;
}

.category-banner {
  width: 100%;
  height: 120px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.category-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px;
}

.product-item {
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-item:active {
  transform: scale(0.96);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.2);
}

.product-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  background: white;
}

.product-name {
  padding: 8px 12px 4px;
  font-size: 13px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  padding: 0 12px 12px;
  font-size: 16px;
  font-weight: 600;
  color: #FF6700;
}

/* PC端优化 */
@media (min-width: 768px) {
  .category-container {
    max-width: 100%;
  }
  
  .category-sidebar {
    width: 120px;
  }
  
  .category-banner {
    height: 180px;
    display: none;
  }
  
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
  }
  
  .product-img {
    height: 180px;
  }
  
  .product-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(255, 103, 0, 0.15);
  }
}

</style>
