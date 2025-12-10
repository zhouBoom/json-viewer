<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const active = ref(0)
const route = useRoute()

// 根据路由更新 tabbar 激活状态
watch(() => route.path, (newPath) => {
  const pathMap = {
    '/home': 0,
    '/category': 1,
    '/cart': 2,
    '/user': 3
  }
  active.value = pathMap[newPath] || 0
}, { immediate: true })
</script>

<style scoped>
/* 样式由全局 style.css 控制 */
</style>
