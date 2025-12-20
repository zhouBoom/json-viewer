<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="hero-title">发现您的理想住所</h1>
      <p class="hero-subtitle">精选优质民宿，让每次旅行都成为美好回忆</p>
      <SearchBar @search="handleSearch" />
    </div>
    
    <div class="container">
      <h2 class="section-title">热门房源推荐</h2>
      
      <div class="rooms-grid">
        <RoomCard 
          v-for="room in filteredRooms" 
          :key="room.id" 
          :room="room" 
        />
      </div>
      
      <div v-if="filteredRooms.length === 0" class="no-results">
        <p>😔 未找到匹配的房源，请尝试其他关键词</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import RoomCard from '../components/RoomCard.vue';
import { rooms } from '../data/rooms.js';

const searchQuery = ref('');

const handleSearch = (query) => {
  searchQuery.value = query;
};

const filteredRooms = computed(() => {
  if (!searchQuery.value) {
    return rooms;
  }
  
  const query = searchQuery.value.toLowerCase();
  return rooms.filter(room => 
    room.title.toLowerCase().includes(query) ||
    room.location.toLowerCase().includes(query) ||
    room.description.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%);
  padding: 4rem 2rem;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin: 0 0 2rem 0;
  opacity: 0.95;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2C3E50;
  margin: 0 0 2rem 0;
  text-align: center;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .container {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .rooms-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
