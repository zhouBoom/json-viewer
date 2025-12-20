<template>
  <div class="search-bar">
    <div class="search-container">
      <span class="search-icon">🔍</span>
      <input 
        type="text" 
        v-model="searchQuery"
        @input="$emit('search', searchQuery)"
        placeholder="搜索目的地、房源名称..." 
        class="search-input"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');

defineEmits(['search']);
</script>

<style scoped>
.search-bar {
  width: 100%;
  padding: 2rem 0;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-container:focus-within {
  box-shadow: 0 6px 30px rgba(255, 107, 107, 0.3);
  transform: translateY(-2px);
}

.search-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.75rem 0;
  background: transparent;
}

.search-input::placeholder {
  color: #999;
}

@media (max-width: 768px) {
  .search-bar {
    padding: 1.5rem 1rem;
  }
  
  .search-container {
    padding: 0.4rem 1rem;
  }
  
  .search-icon {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  
  .search-input {
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
}
</style>
