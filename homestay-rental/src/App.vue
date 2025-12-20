<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
