<template>
  <div class="desktop-layout">
    <Header />
    <div class="flex flex-row h-full overflow-hidden">
      <Sidebar />
      <div class="content w-full bg-gray-950 p-6 overflow-y-auto">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped>
.desktop-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Toma toda la altura de la ventana */
}

.content {
  flex: 1; /* Hace que este elemento ocupe el espacio disponible */
}
</style>
