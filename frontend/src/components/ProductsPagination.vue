<template>
    <nav>
      <button @click="fetchProductos(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="fetchProductos(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
    </nav>
</template>

<script>
import { ref, onMounted } from 'vue';

</script>