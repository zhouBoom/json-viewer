<template>
  <div class="cart-page">
    <!-- 顶部导航 -->
    <van-nav-bar title="购物车" left-arrow @click-left="router.back()" fixed />
    
    <div class="content" style="margin-top: 46px; padding-bottom: 60px;">
      <!-- 购物车为空 -->
      <van-empty
        v-if="cartItems.length === 0"
        description="购物车是空的"
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      >
        <van-button round type="danger" class="bottom-button" @click="goToHome">
          去逛逛
        </van-button>
      </van-empty>

      <!-- 购物车列表 -->
      <div v-else class="cart-list">
        <van-checkbox-group v-model="checkedGoods">
          <van-swipe-cell v-for="item in cartItems" :key="item.id">
            <div class="cart-item">
              <van-checkbox :name="item.id" />
              <img :src="item.image" :alt="item.title" class="item-image" @click="goToProduct(item.id)" />
              <div class="item-info">
                <div class="item-title" @click="goToProduct(item.id)">{{ item.title }}</div>
                <div class="item-spec">{{ item.spec }}</div>
                <div class="item-footer">
                  <span class="item-price">¥{{ item.price }}</span>
                  <van-stepper v-model="item.quantity" min="1" @change="onQuantityChange(item)" />
                </div>
              </div>
            </div>
            <template #right>
              <van-button square type="danger" text="删除" class="delete-button" @click="deleteItem(item.id)" />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>

        <!-- 推荐商品 -->
        <div class="recommend-section">
          <div class="recommend-title">
            <van-icon name="fire" color="#FF6700" />
            <span>猜你喜欢</span>
          </div>
          <div class="recommend-list">
            <div
              v-for="product in recommendProducts"
              :key="product.id"
              class="recommend-item"
              @click="goToProduct(product.id)"
            >
              <img :src="product.image" :alt="product.title" />
              <div class="recommend-info">
                <div class="recommend-name">{{ product.title }}</div>
                <div class="recommend-price">¥{{ product.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算栏 -->
    <van-submit-bar
      v-if="cartItems.length > 0"
      :price="totalPrice * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll" @change="onCheckAll">全选</van-checkbox>
      <template #tip>
        <div class="submit-tip">
          已选 <span class="highlight">{{ checkedGoods.length }}</span> 件商品
        </div>
      </template>
    </van-submit-bar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast, showConfirmDialog } from 'vant'

const router = useRouter()

// 购物车商品
const cartItems = ref([
  {
    id: 1,
    title: '小米14 Ultra',
    spec: '黑色 / 16GB+512GB',
    price: 6499,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'Redmi K70 Pro',
    spec: '墨羽 / 12GB+256GB',
    price: 3299,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=200&fit=crop'
  },
  {
    id: 5,
    title: '小米手环8',
    spec: '曜石黑',
    price: 239,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
  }
])

// 推荐商品
const recommendProducts = ref([
  { id: 20, title: '小米 Buds 5', price: 599, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop' },
  { id: 11, title: '小米笔记本 Pro 14', price: 5499, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
  { id: 14, title: '米家扫地机器人', price: 1999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
  { id: 18, title: '小米手表 S3', price: 1299, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' }
])

// 选中的商品
const checkedGoods = ref([1, 2, 5])

// 全选状态
const checkedAll = computed({
  get() {
    return checkedGoods.value.length === cartItems.value.length
  },
  set(value) {
    if (value) {
      checkedGoods.value = cartItems.value.map(item => item.id)
    } else {
      checkedGoods.value = []
    }
  }
})

// 总价
const totalPrice = computed(() => {
  return cartItems.value
    .filter(item => checkedGoods.value.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0)
})

// 全选/取消全选
const onCheckAll = () => {
  // 由 computed 自动处理
}

// 数量变化
const onQuantityChange = (item) => {
  showToast(`已更新数量为 ${item.quantity}`)
}

// 删除商品
const deleteItem = (id) => {
  showConfirmDialog({
    title: '确认删除',
    message: '确定要删除这件商品吗？'
  }).then(() => {
    const index = cartItems.value.findIndex(item => item.id === id)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      const checkedIndex = checkedGoods.value.indexOf(id)
      if (checkedIndex > -1) {
        checkedGoods.value.splice(checkedIndex, 1)
      }
      showSuccessToast('删除成功')
    }
  }).catch(() => {
    // 取消删除
  })
}

// 结算
const onSubmit = () => {
  if (checkedGoods.value.length === 0) {
    showToast('请选择要结算的商品')
    return
  }
  showToast(`结算 ${checkedGoods.value.length} 件商品，总价 ¥${totalPrice.value}`)
}

// 跳转到首页
const goToHome = () => {
  router.push('/home')
}

// 跳转到商品详情
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<style scoped>
.cart-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 50px;
}

/* 导航栏返回按钮颜色 */
.cart-page :deep(.van-nav-bar__arrow) {
  color: white;
}

.content {
  min-height: calc(100vh - 106px);
}

/* 购物车列表 */
.cart-list {
  padding-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  margin-bottom: 12px;
  gap: 12px;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  background: #f5f5f5;
  cursor: pointer;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

.item-spec {
  font-size: 12px;
  color: #999;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 18px;
  font-weight: 600;
  color: #FF6700;
}

.delete-button {
  height: 100%;
}

/* 推荐商品 */
.recommend-section {
  background: white;
  padding: 16px;
  margin-top: 12px;
}

.recommend-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.recommend-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.recommend-item {
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.recommend-item:active {
  transform: scale(0.96);
}

.recommend-item img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  background: white;
}

.recommend-info {
  padding: 8px;
}

.recommend-name {
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-price {
  font-size: 16px;
  font-weight: 600;
  color: #FF6700;
}

/* 结算栏 */
.submit-tip {
  font-size: 12px;
  color: #999;
}

.highlight {
  color: #FF6700;
  font-weight: 600;
}

.cart-page :deep(.van-submit-bar__bar) {
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
}

.cart-page :deep(.van-submit-bar__button) {
  background: linear-gradient(135deg, #FF6700 0%, #e65a00 100%);
}

.cart-page :deep(.van-checkbox__icon--checked .van-icon) {
  background-color: #FF6700;
  border-color: #FF6700;
}

.bottom-button {
  margin-top: 20px;
  background: linear-gradient(135deg, #FF6700 0%, #e65a00 100%);
  border: none;
}

/* PC端优化 */
@media (min-width: 768px) {
  .cart-page {
    position: relative;
  }
  
  .content {
    padding: 0 20px 100px 20px;
  }
  
  .cart-item {
    border-radius: 12px;
    margin-bottom: 16px;
  }
  
  .item-image {
    width: 120px;
    height: 120px;
  }
  
  .recommend-section {
    margin-top: 20px;
    border-radius: 12px;
  }
  
  .recommend-list {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  
  .recommend-item img {
    height: 160px;
  }
  
  /* PC端结算栏固定在容器底部 */
  .cart-page :deep(.van-submit-bar) {
    position: fixed;
    max-width: 1200px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    border-radius: 0;
  }
  
  /* 限制结算按钮宽度 */
  .cart-page :deep(.van-submit-bar__button) {
    max-width: 200px;
    margin-left: auto;
  }
  
  /* PC端隐藏返回按钮 */
  .cart-page :deep(.van-nav-bar__left) {
    display: none;
  }
}


</style>
