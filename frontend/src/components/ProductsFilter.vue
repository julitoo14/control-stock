<template>
  <!-- Filtros y barra de búsqueda -->
  <div class="mb-4 flex flex-wrap items-center gap-4">
    <!-- Filtro de categorías -->
    <select v-model="selectedCategory"
      class="border border-gray-300 rounded px-3 py-2 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
      @change="search">
      <option value="">Todas las categorías</option>
      <option v-for="category in props.categories" :key="category._id" :value="category._id">
        {{ category.nombre }}
      </option>
    </select>

    <!-- Cantidad de productos por página -->
    <select v-model="itemsPerPage"
      class="border border-gray-300 rounded px-3 py-2 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
      @change="search">
      <option v-for="option in [5, 10, 20, 50]" :key="option" :value="option">
        {{ option }} por página
      </option>
    </select>

    <!-- Barra de búsqueda -->
    <input v-model="searchQuery" type="text" placeholder="Buscar productos"
      class="border border-gray-300 rounded px-3 py-2 text-gray-900 dark:text-gray-100 dark:bg-gray-800 flex-1"
      @input="search" />

    <button @click="clearFilters" class="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded">
      Limpiar
    </button>

    <router-link to="/productos/guardar" class="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded">
      Agregar producto
    </router-link>

  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getCategories } from '../services/categories';

// Variables reactivas para los filtros
const selectedCategory = ref('');
const itemsPerPage = ref(20);
const searchQuery = ref('');
const emit = defineEmits(['fetch-products']);
const props = defineProps({
  categories: Array,
});

// Método para buscar productos con filtros
const search = () => {
  // Construir parámetros de consulta
  const params = {
    categoria: selectedCategory.value,
    limit: itemsPerPage.value,
    search: searchQuery.value,
  };

  // Crear la cadena de consulta
  const queryString = new URLSearchParams(params).toString();
  // Emitir los filtros como query
  emit('fetch-products', queryString);
};

// Método para limpiar filtros
const clearFilters = () => {
  selectedCategory.value = '';
  itemsPerPage.value = 20;
  searchQuery.value = '';
  search(); // Vuelve a emitir el evento con los filtros reiniciados
};
</script>