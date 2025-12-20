<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h4>关于我们</h4>
        <p>悦居民宿致力于为您提供优质的住宿体验</p>
      </div>
      
      <div class="footer-section">
        <h4>联系方式</h4>
        <p>📧 contact@yueju.com</p>
        <p>📱 400-123-4567</p>
      </div>
      
      <div class="footer-section">
        <h4>关注我们</h4>
        <p>公众号: 悦居民宿</p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 悦居民宿. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
  color: white;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #4ECDC4;
}

.footer-section p {
  margin: 0.5rem 0;
  color: #BDC3C7;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.2);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  color: #95A5A6;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 2rem 1rem 1rem;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-section h4 {
    font-size: 1.1rem;
  }
  
  .footer-bottom {
    padding: 1rem;
  }
}
</style>
