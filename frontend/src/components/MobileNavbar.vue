<template>
    <nav class="bg-blue-600 text-white fixed bottom-0 w-full flex justify-around py-2">
      <router-link to="/" class="text-center">
        <span class="block">🏠</span>
        <span class="text-sm">Inicio</span>
      </router-link>
      <router-link to="/wallets" class="text-center">
        <span class="block">💼</span>
        <span class="text-sm">Carteras</span>
      </router-link>
      <router-link to="/favorites" class="text-center">
        <span class="block">⭐</span>
        <span class="text-sm">Favoritos</span>
      </router-link>
      <router-link to="/settings" class="text-center">
        <span class="block">⚙️</span>
        <span class="text-sm">Configuración</span>
      </router-link>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  