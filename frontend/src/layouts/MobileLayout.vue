<template>
    <div class="mobile-layout">
        <MobileNavbar />
        <router-view />
    </div>
</template>

<script setup>
import MobileNavbar from "@/components/MobileNavbar.vue";
</script>

<style scoped>
.mobile-layout {
    display: flex;
    flex-direction: column;
}
</style>