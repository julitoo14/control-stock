<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar siempre visible -->
    <Navbar class="flex-none" />
    <!-- Contenido dinámico -->
    <router-view class="flex-grow overflow-y-auto" />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';

</script>
