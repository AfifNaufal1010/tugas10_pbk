<template>
  <header class="main-header">
    <div class="header-container">
      <div class="header-content">
        <div class="title-section">
          <div class="title-icon">{{ getPageIcon() }}</div>
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
        <div class="breadcrumb">
          <span class="breadcrumb-item">SIKOLEKSI</span>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">{{ pageTitle }}</span>
        </div>
      </div>
      <div class="header-decoration">
        <div class="decoration-circle decoration-1"></div>
        <div class="decoration-circle decoration-2"></div>
        <div class="decoration-circle decoration-3"></div>
      </div>
    </div>
    <div class="header-gradient"></div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  // Mapping path ke judul
  if (route.path === '/dashboard') return 'Dashboard'
  if (route.path.startsWith('/tambah')) return 'Tambah Buku'
  if (route.path.startsWith('/koleksi')) return 'Daftar Buku'
  if (route.path.startsWith('/status/sedang')) return 'Sedang Dibaca'
  if (route.path.startsWith('/status/selesai')) return 'Selesai Dibaca'
  if (route.path.startsWith('/laporan')) return 'Laporan'
  if (route.path.startsWith('/login')) return 'Login'
  return 'SIKOLEKSI'
})

const getPageIcon = () => {
  // Mapping path ke ikon
  if (route.path === '/dashboard') return '🏠'
  if (route.path.startsWith('/koleksi/tambah')) return '📝'
  if (route.path.startsWith('/koleksi')) return '📚'
  if (route.path.startsWith('/status/sedang')) return '📖'
  if (route.path.startsWith('/status/selesai')) return '✅'
  if (route.path.startsWith('/laporan')) return '📊'
  if (route.path.startsWith('/login')) return '🔐'
  return '📚'
}
</script>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 30;
  padding: 0;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
  border-radius: 0 0 24px 24px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.header-container {
  position: relative;
  padding: 2rem 2rem 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  flex: 1;
  z-index: 2;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.title-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  animation: bounce 2s infinite;
}

.page-title {
  color: white;
  font-weight: 800;
  margin: 0;
  font-size: 2.5rem;
  letter-spacing: 1px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: slideInLeft 0.8s ease-out;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
}

.breadcrumb-item {
  font-weight: 500;
}

.breadcrumb-separator {
  font-weight: 300;
  font-size: 1.2rem;
}

.breadcrumb-current {
  font-weight: 600;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.8rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.header-decoration {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 1rem;
}

.decoration-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float 3s ease-in-out infinite;
}

.decoration-1 {
  animation-delay: 0s;
}

.decoration-2 {
  animation-delay: 1s;
  width: 40px;
  height: 40px;
}

.decoration-3 {
  animation-delay: 2s;
  width: 30px;
  height: 30px;
}

.header-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, 
    #ff6b6b 0%, 
    #4ecdc4 25%, 
    #45b7d1 50%, 
    #96ceb4 75%, 
    #ffeaa7 100%
  );
  animation: gradientShift 3s ease-in-out infinite;
}

/* Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Hover Effects */
.main-header:hover .title-icon {
  animation-duration: 0.5s;
}

.main-header:hover .decoration-circle {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  transition: all 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    padding: 1.5rem 1rem 1rem 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .title-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .breadcrumb {
    font-size: 0.8rem;
  }
  
  .header-decoration {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    align-self: center;
  }
  
  .decoration-circle {
    width: 40px;
    height: 40px;
  }
  
  .decoration-2 {
    width: 30px;
    height: 30px;
  }
  
  .decoration-3 {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 1rem;
  }
  
  .title-section {
    align-items: center;
    flex-direction: row;
    gap: 0.8rem;
  }
  
  .title-icon {
    font-size: 1.8rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .breadcrumb {
    justify-content: center;
  }
  
  .header-decoration {
    display: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .main-header {
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  }
  
  .header-gradient {
    background: linear-gradient(90deg, 
      #ff6b6b 0%, 
      #4ecdc4 25%, 
      #45b7d1 50%, 
      #96ceb4 75%, 
      #ffeaa7 100%
    );
    opacity: 0.8;
  }
}
</style>