<template>
  <router-link :to="`/room/${room.id}`" class="room-card">
    <div class="image-container">
      <img :src="room.image" :alt="room.title" class="room-image" />
      <div class="rating-badge">
        ⭐ {{ room.rating }}
      </div>
    </div>
    
    <div class="room-info">
      <h3 class="room-title">{{ room.title }}</h3>
      <p class="room-location">📍 {{ room.location }}</p>
      
      <div class="room-footer">
        <div class="price-section">
          <span class="price">¥{{ room.price }}</span>
          <span class="price-unit">/晚</span>
        </div>
        <div class="reviews">
          {{ room.reviews }} 条评价
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  room: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.room-card {
  display: block;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.room-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 66.67%; /* 3:2 aspect ratio */
  overflow: hidden;
}

.room-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.room-card:hover .room-image {
  transform: scale(1.05);
}

.rating-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.room-info {
  padding: 1.25rem;
}

.room-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2C3E50;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-location {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.room-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #FF6B6B;
}

.price-unit {
  font-size: 0.9rem;
  color: #666;
}

.reviews {
  font-size: 0.85rem;
  color: #999;
}

@media (max-width: 768px) {
  .room-info {
    padding: 1rem;
  }
  
  .room-title {
    font-size: 1rem;
  }
  
  .price {
    font-size: 1.3rem;
  }
}
</style>
