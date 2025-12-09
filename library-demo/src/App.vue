<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-content">
        <div class="navbar-brand">📚 图书馆座位预约系统</div>
        <ul class="navbar-nav">
          <li>
            <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
              🏠 首页
            </router-link>
          </li>
          <li>
            <router-link to="/booking" class="nav-link" :class="{ active: $route.path === '/booking' }">
              💺 座位预约
            </router-link>
          </li>
          <li>
            <router-link to="/statistics" class="nav-link" :class="{ active: $route.path === '/statistics' }">
              📊 数据统计
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
