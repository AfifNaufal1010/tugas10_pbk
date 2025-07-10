<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const login = () => {
  if ((username.value === '233510518' && password.value === '12345') ||
      (username.value === 'user' && password.value === 'user')) {
    localStorage.setItem('login', 'true')
    localStorage.setItem('username', username.value)
    router.push('/dashboard')
  } else {
    error.value = 'Username atau password salah!'
  }
}
</script>

<template>
  <div class="login-container">
    <h2 class="login-title">LOGIN SIKOLEKSI</h2>
    <img class="login-img" src="https://cdn-icons-png.flaticon.com/512/29/29302.png" alt="Buku" />
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eafaf7 60%, #f8fafd 100%);
}
.login-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: #159c86;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(26,188,156,0.08);
}
.login-img {
  width: 80px;
  height: 80px;
  margin-bottom: 18px;
  filter: drop-shadow(0 4px 8px rgba(44, 62, 80, 0.10));
}
h1 {
  color: #1abc9c;
  font-weight: 700;
  margin-bottom: 18px;
}
form {
  background: #fff;
  padding: 28px 24px;
  border-radius: 14px;
  box-shadow: 0 2px 16px 0 rgba(44, 62, 80, 0.08);
  max-width: 420px;
  margin-bottom: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input, button {
  font-size: 1rem;
  border-radius: 10px;
  border: 1.5px solid #dfe6e9;
  padding: 10px 14px;
  margin-bottom: 14px;
  outline: none;
  width: 100%;
  transition: border 0.2s;
}
input:focus {
  border: 1.5px solid #1abc9c;
}
button {
  background: #1abc9c;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px 0 rgba(26,188,156,0.08);
}
button:hover {
  background: #159c86;
}
.error-msg {
  margin-top: 10px;
  font-weight: 600;
  color: #e74c3c;
  background: #fdecea;
  padding: 8px 18px;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(231,76,60,0.08);
}
@media (max-width: 600px) {
  .login-container {
    padding: 18px 4px;
  }
  form {
    padding: 18px 8px;
    max-width: 98vw;
  }
  .login-img {
    width: 60px;
    height: 60px;
  }
  .login-title {
    font-size: 1.3rem;
  }
}
</style>
