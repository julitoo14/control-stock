<template>
  <component :is="currentLayout" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import DesktopLayout from "@/layouts/DesktopLayout.vue";
import MobileLayout from "@/layouts/MobileLayout.vue";

const isMobile = ref(false);

const checkViewport = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkViewport();
  window.addEventListener("resize", checkViewport);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkViewport);
});

const currentLayout = computed(() => (isMobile.value ? MobileLayout : DesktopLayout));
</script>
