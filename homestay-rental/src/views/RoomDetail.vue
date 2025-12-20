<template>
  <div class="room-detail" v-if="room">
    <div class="back-button" @click="goBack">
      ← 返回
    </div>
    
    <!-- 图片轮播 -->
    <div class="image-gallery">
      <div class="main-image">
        <img :src="currentImage" :alt="room.title" />
      </div>
      <div class="thumbnail-list">
        <img 
          v-for="(image, index) in room.images" 
          :key="index"
          :src="image" 
          :alt="`${room.title} - ${index + 1}`"
          :class="{ active: currentImageIndex === index }"
          @click="currentImageIndex = index"
          class="thumbnail"
        />
      </div>
    </div>
    
    <div class="container">
      <!-- 房源基本信息 -->
      <div class="detail-grid">
        <div class="main-content">
          <h1 class="room-title">{{ room.title }}</h1>
          
          <div class="room-meta">
            <span class="rating">⭐ {{ room.rating }}</span>
            <span class="reviews">{{ room.reviews }} 条评价</span>
            <span class="location">📍 {{ room.location }}</span>
          </div>
          
          <div class="room-specs">
            <div class="spec-item">
              <span class="spec-icon">🛏️</span>
              <span>{{ room.bedrooms }} 卧室</span>
            </div>
            <div class="spec-item">
              <span class="spec-icon">🛋️</span>
              <span>{{ room.beds }} 张床</span>
            </div>
            <div class="spec-item">
              <span class="spec-icon">🚿</span>
              <span>{{ room.bathrooms }} 卫生间</span>
            </div>
            <div class="spec-item">
              <span class="spec-icon">👥</span>
              <span>最多 {{ room.maxGuests }} 位房客</span>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <!-- 房东信息 -->
          <div class="host-section">
            <h2 class="section-title">房东信息</h2>
            <div class="host-card">
              <div class="host-avatar">{{ room.host.avatar }}</div>
              <div class="host-info">
                <h3 class="host-name">{{ room.host.name }}</h3>
                <p class="host-intro">{{ room.host.intro }}</p>
              </div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <!-- 房源描述 -->
          <div class="description-section">
            <h2 class="section-title">房源介绍</h2>
            <p class="description">{{ room.description }}</p>
          </div>
          
          <div class="divider"></div>
          
          <!-- 设施配备 -->
          <div class="facilities-section">
            <h2 class="section-title">设施配备</h2>
            <div class="facilities-grid">
              <div v-for="facility in room.facilities" :key="facility" class="facility-item">
                <span class="facility-icon">✓</span>
                <span>{{ facility }}</span>
              </div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <!-- 用户评价 -->
          <div class="reviews-section">
            <h2 class="section-title">用户评价</h2>
            <div class="reviews-list">
              <div v-for="(review, index) in room.userReviews" :key="index" class="review-card">
                <div class="review-header">
                  <div class="reviewer-info">
                    <span class="reviewer-avatar">👤</span>
                    <span class="reviewer-name">{{ review.user }}</span>
                  </div>
                  <span class="review-date">{{ review.date }}</span>
                </div>
                <div class="review-rating">
                  <span v-for="i in review.rating" :key="i">⭐</span>
                </div>
                <p class="review-comment">{{ review.comment }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 预订卡片 -->
        <div class="booking-card">
          <div class="price-info">
            <span class="price">¥{{ room.price }}</span>
            <span class="price-unit">/晚</span>
          </div>
          
          <button class="book-button" @click="handleBooking">立即预订</button>
          
          <div class="booking-note">
            <p>✓ 免费取消</p>
            <p>✓ 即时确认</p>
            <p>✓ 7天无理由退款</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="not-found">
    <h2>😔 房源不存在</h2>
    <button @click="goBack" class="back-home-button">返回首页</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { rooms } from '../data/rooms.js';

const route = useRoute();
const router = useRouter();

const currentImageIndex = ref(0);

const room = computed(() => {
  const id = parseInt(route.params.id);
  return rooms.find(r => r.id === id);
});

const currentImage = computed(() => {
  if (!room.value) return '';
  return room.value.images[currentImageIndex.value];
});

const goBack = () => {
  router.push('/');
};

const handleBooking = () => {
  alert('预订功能开发中，敬请期待！');
};
</script>

<style scoped>
.room-detail {
  min-height: 100vh;
  padding-bottom: 2rem;
}

.back-button {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem 0;
  font-size: 1rem;
  color: #FF6B6B;
  cursor: pointer;
  display: inline-block;
  transition: transform 0.3s ease;
}

.back-button:hover {
  transform: translateX(-5px);
}

.image-gallery {
  max-width: 1200px;
  margin: 1rem auto 2rem;
  padding: 0 2rem;
}

.main-image {
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.thumbnail {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.thumbnail:hover {
  opacity: 0.8;
}

.thumbnail.active {
  opacity: 1;
  border-color: #FF6B6B;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;
}

.main-content {
  flex: 1;
}

.room-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2C3E50;
  margin: 0 0 1rem 0;
}

.room-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.rating {
  font-weight: bold;
  color: #FF6B6B;
}

.reviews, .location {
  color: #666;
}

.room-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #F8F9FA;
  border-radius: 12px;
}

.spec-icon {
  font-size: 1.5rem;
}

.divider {
  height: 1px;
  background: #E0E0E0;
  margin: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2C3E50;
  margin: 0 0 1.5rem 0;
}

.host-card {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #FFF5F5 0%, #FFF8F0 100%);
  border-radius: 16px;
}

.host-avatar {
  font-size: 4rem;
}

.host-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2C3E50;
  margin: 0 0 0.5rem 0;
}

.host-intro {
  color: #666;
  margin: 0;
}

.description {
  line-height: 1.8;
  color: #555;
  font-size: 1.05rem;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.facility-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #F8F9FA;
  border-radius: 8px;
}

.facility-icon {
  color: #4ECDC4;
  font-weight: bold;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-card {
  padding: 1.5rem;
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reviewer-avatar {
  font-size: 2rem;
}

.reviewer-name {
  font-weight: bold;
  color: #2C3E50;
}

.review-date {
  color: #999;
  font-size: 0.9rem;
}

.review-rating {
  margin-bottom: 0.75rem;
}

.review-comment {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.booking-card {
  position: sticky;
  top: 6rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #FF6B6B;
}

.price-unit {
  font-size: 1.1rem;
  color: #666;
}

.book-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.book-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 107, 107, 0.3);
}

.booking-note {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E0E0E0;
}

.booking-note p {
  margin: 0.5rem 0;
  color: #4ECDC4;
  font-size: 0.95rem;
}

.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.back-home-button {
  padding: 1rem 2rem;
  background: #FF6B6B;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

@media (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .booking-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .image-gallery {
    padding: 0 1rem;
  }
  
  .main-image {
    height: 300px;
  }
  
  .thumbnail {
    height: 80px;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .room-title {
    font-size: 1.8rem;
  }
  
  .room-specs {
    grid-template-columns: 1fr 1fr;
  }
  
  .facilities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
