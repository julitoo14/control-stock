<template>
    <aside class="flex justify-center bg-gray-900 text-white h-screen py-6 w-48">
      <nav>
        <ul class="space-y-4 text-xl font-bold">
          <li><router-link to="/" class="block hover:text-gray-300">🏠 Dashboard</router-link></li>
          <li><router-link to="/productos" class="block hover:text-gray-300">📦 Productos</router-link></li>
          <li><router-link to="/favorites" class="block hover:text-gray-300"> 🗂 Categorías</router-link></li>
          <li><router-link to="/movimientos" class="block hover:text-gray-300">🔁 Movimientos</router-link></li>
          <li><router-link to="/settings" class="block hover:text-gray-300">🔩 Configuración</router-link></li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  