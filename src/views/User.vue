<template>
  <div class="user-profile">
    <div class="profile-card">
      <img class="profile-img" src="https://ui-avatars.com/api/?name=Mohd+Afif+Naufal&background=1abc9c&color=fff&size=128" alt="Foto Profil" />
      <div class="profile-info">
        <h2 class="profile-name">Mohd. Afif Naufal</h2>
        <div class="profile-detail"><b>NPM:</b> 233510518</div>
        <div class="profile-detail"><b>Prodi:</b> Teknik Informatika</div>
        <div class="profile-detail"><b>Semester:</b> IV (empat)</div>
      </div>
      <button class="logout-btn" @click="showLogoutPopup = true">Logout</button>
      <button class="reset-btn" @click="showResetPopup = true">Reset Data Bacaan</button>
    </div>
    <div v-if="showLogoutPopup" class="popup-overlay">
      <div class="popup">
        <p>Apakah Anda yakin ingin logout?</p>
        <div class="popup-actions">
          <button @click="logout" class="confirm-btn">Ya, Logout</button>
          <button @click="showLogoutPopup = false" class="cancel-btn">Batal</button>
        </div>
      </div>
    </div>
    <div v-if="showResetPopup" class="popup-overlay">
      <div class="popup">
        <p>Apakah Anda yakin ingin mereset semua data status bacaan?</p>
        <div class="popup-actions">
          <button @click="resetStatus" class="confirm-btn">Ya, Reset</button>
          <button @click="showResetPopup = false" class="cancel-btn">Batal</button>
        </div>
      </div>
    </div>
    <div v-if="resetSuccess" class="reset-success-msg">Data bacaan berhasil direset!</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books'

const showLogoutPopup = ref(false)
const showResetPopup = ref(false)
const resetSuccess = ref(false)
const router = useRouter()
const booksStore = useBooksStore()

function logout() {
  localStorage.setItem('login', 'false')
  showLogoutPopup.value = false
  router.push('/login')
}
function resetStatus() {
  booksStore.resetStatus()
  showResetPopup.value = false
  resetSuccess.value = true
  setTimeout(() => { resetSuccess.value = false }, 2000)
}
</script>

<style scoped>
.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: linear-gradient(135deg, #eafaf7 60%, #f8fafd 100%);
}
.profile-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(44,62,80,0.10);
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  min-width: 320px;
  position: relative;
}
.profile-img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px 0 rgba(26,188,156,0.13);
  margin-bottom: 10px;
}
.profile-info {
  text-align: center;
}
.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #159c86;
  margin-bottom: 8px;
}
.profile-detail {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 4px;
}
.logout-btn {
  margin-top: 24px;
  align-self: center;
  padding: 10px 28px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px 0 rgba(231,76,60,0.08);
}
.logout-btn:hover {
  background: #c0392b;
}
.reset-btn {
  margin-top: 12px;
  padding: 10px 28px;
  background: #f39c12;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.reset-btn:hover {
  background: #d35400;
}
.reset-success-msg {
  margin-top: 18px;
  color: #27ae60;
  background: #eafaf7;
  border: 1px solid #27ae60;
  border-radius: 8px;
  padding: 10px 18px;
  text-align: center;
  font-weight: 600;
}
.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44, 62, 80, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.popup {
  background: #fff;
  padding: 32px 28px;
  border-radius: 14px;
  box-shadow: 0 4px 24px 0 rgba(44,62,80,0.13);
  text-align: center;
}
.popup-actions {
  margin-top: 18px;
  display: flex;
  gap: 16px;
  justify-content: center;
}
.confirm-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.confirm-btn:hover {
  background: #c0392b;
}
.cancel-btn {
  background: #bdc3c7;
  color: #2c3e50;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.cancel-btn:hover {
  background: #95a5a6;
}
</style>
