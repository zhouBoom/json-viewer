<template>
  <div class="search-page">
    <div class="search-header">
      <h1>搜索房源</h1>
      <SearchBar @search="handleSearch" />
    </div>
    
    <div class="container">
      <div class="search-layout">
        <!-- 筛选侧边栏 -->
        <div class="filters-sidebar">
          <h3>筛选条件</h3>
          
          <div class="filter-section">
            <h4>价格范围</h4>
            <div class="price-filters">
              <button 
                v-for="range in priceRanges" 
                :key="range.label"
                :class="{ active: selectedPriceRange === range.label }"
                @click="selectPriceRange(range)"
                class="filter-button"
              >
                {{ range.label }}
              </button>
            </div>
          </div>
          
          <div class="filter-section">
            <h4>房型</h4>
            <div class="room-type-filters">
              <button 
                v-for="type in roomTypes" 
                :key="type"
                :class="{ active: selectedRoomType === type }"
                @click="selectRoomType(type)"
                class="filter-button"
              >
                {{ type }}
              </button>
            </div>
          </div>
          
          <button @click="clearFilters" class="clear-button">清除筛选</button>
        </div>
        
        <!-- 搜索结果 -->
        <div class="search-results">
          <div class="results-header">
            <h2>找到 {{ filteredRooms.length }} 个房源</h2>
          </div>
          
          <div class="rooms-grid">
            <RoomCard 
              v-for="room in filteredRooms" 
              :key="room.id" 
              :room="room" 
            />
          </div>
          
          <div v-if="filteredRooms.length === 0" class="no-results">
            <p>😔 未找到匹配的房源</p>
            <p>请尝试调整筛选条件或搜索关键词</p>
          </div>
        </div>
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
const selectedPriceRange = ref('');
const selectedRoomType = ref('');

const priceRanges = [
  { label: '全部价格', min: 0, max: Infinity },
  { label: '¥0-500', min: 0, max: 500 },
  { label: '¥500-1000', min: 500, max: 1000 },
  { label: '¥1000+', min: 1000, max: Infinity }
];

const roomTypes = ['全部房型', '整套房源', '独立房间', '合住房间'];

const handleSearch = (query) => {
  searchQuery.value = query;
};

const selectPriceRange = (range) => {
  selectedPriceRange.value = range.label;
};

const selectRoomType = (type) => {
  selectedRoomType.value = type;
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedPriceRange.value = '';
  selectedRoomType.value = '';
};

const filteredRooms = computed(() => {
  let filtered = rooms;
  
  // 搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(room => 
      room.title.toLowerCase().includes(query) ||
      room.location.toLowerCase().includes(query) ||
      room.description.toLowerCase().includes(query)
    );
  }
  
  // 价格范围筛选
  if (selectedPriceRange.value && selectedPriceRange.value !== '全部价格') {
    const range = priceRanges.find(r => r.label === selectedPriceRange.value);
    if (range) {
      filtered = filtered.filter(room => 
        room.price >= range.min && room.price < range.max
      );
    }
  }
  
  // 房型筛选（这里简化处理，实际应根据房源数据的房型字段）
  // 由于示例数据没有明确的房型字段，这里仅作演示
  
  return filtered;
});
</script>

<style scoped>
.search-page {
  min-height: 100vh;
}

.search-header {
  background: linear-gradient(135deg, #45B7D1 0%, #4ECDC4 100%);
  padding: 3rem 2rem;
  color: white;
  text-align: center;
}

.search-header h1 {
  font-size: 2.5rem;
  margin: 0 0 2rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.search-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

.filters-sidebar {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.filters-sidebar h3 {
  font-size: 1.3rem;
  color: #2C3E50;
  margin: 0 0 1.5rem 0;
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-section h4 {
  font-size: 1rem;
  color: #555;
  margin: 0 0 1rem 0;
}

.price-filters,
.room-type-filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-button {
  padding: 0.75rem 1rem;
  background: #F8F9FA;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  text-align: left;
}

.filter-button:hover {
  background: #E9ECEF;
}

.filter-button.active {
  background: #FFF5F5;
  border-color: #FF6B6B;
  color: #FF6B6B;
  font-weight: bold;
}

.clear-button {
  width: 100%;
  padding: 0.75rem;
  background: white;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  margin-top: 1rem;
}

.clear-button:hover {
  border-color: #FF6B6B;
  color: #FF6B6B;
}

.search-results {
  flex: 1;
}

.results-header {
  margin-bottom: 2rem;
}

.results-header h2 {
  font-size: 1.5rem;
  color: #2C3E50;
  margin: 0;
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
}

.no-results p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

@media (max-width: 1024px) {
  .search-layout {
    grid-template-columns: 1fr;
  }
  
  .filters-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .search-header {
    padding: 2rem 1rem;
  }
  
  .search-header h1 {
    font-size: 2rem;
  }
  
  .container {
    padding: 1.5rem 1rem;
  }
  
  .rooms-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
